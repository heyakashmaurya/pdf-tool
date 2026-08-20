import fs from "fs/promises";
import path from "path";
import os from "os";
import { execFile } from "child_process";
import { promisify } from "util";
import { PDFDocument, rgb } from "pdf-lib";
import dotenv from "dotenv"
dotenv.config()

const execFileAsync = promisify(execFile);

const TESSERACT_PATH =
    process.env.TESSERACT_PATH ||
    "C:\\Program Files\\Tesseract-OCR\\tesseract.exe";

const PDFTOPPM_PATH =
    process.env.PDFTOPPM_PATH ||
    "C:\Users\Akash M\Downloads\Release-26.02.0-0\poppler-26.02.0\Library\bin\pdftoppm.exe";

const MAX_PAGES = 50;

export async function ocrPdf(
    inputPdfPath: string,
): Promise<Buffer> {
    const workDir = await fs.mkdtemp(
        path.join(os.tmpdir(), "ocr-pdf-"),
    );

    try {
        const outputPrefix = path.join(workDir, "page");

        /*
         * Convert PDF pages into PNG images.
         *
         * -png       = PNG output
         * -r 150     = 150 DPI
         */
        await execFileAsync(
            PDFTOPPM_PATH,
            [
                "-png",
                "-r",
                "150",
                inputPdfPath,
                outputPrefix,
            ],
            {
                windowsHide: true,
                maxBuffer: 20 * 1024 * 1024,
            },
        );

        const files = await fs.readdir(workDir);

        const imageFiles = files
            .filter(
                (file) =>
                    file.startsWith("page-") &&
                    file.toLowerCase().endsWith(".png"),
            )
            .sort((a, b) => {
                const pageA = parseInt(
                    a.match(/-(\d+)\.png$/)?.[1] || "0",
                    10,
                );

                const pageB = parseInt(
                    b.match(/-(\d+)\.png$/)?.[1] || "0",
                    10,
                );

                return pageA - pageB;
            });

        if (imageFiles.length === 0) {
            throw new Error(
                "Could not convert the PDF into images.",
            );
        }

        if (imageFiles.length > MAX_PAGES) {
            throw new Error(
                `PDFs are limited to ${MAX_PAGES} pages for OCR.`,
            );
        }

        const outputPdf = await PDFDocument.create();

        for (const imageFile of imageFiles) {
            const imagePath = path.join(
                workDir,
                imageFile,
            );

            const imageBytes = await fs.readFile(imagePath);

            /*
             * Run Tesseract.
             *
             * We use stdout directly so we don't have
             * to create an additional text file.
             */
            const { stdout } = await execFileAsync(
                TESSERACT_PATH,
                [
                    imagePath,
                    "stdout",
                    "-l",
                    "eng",
                    "--psm",
                    "3",
                ],
                {
                    windowsHide: true,
                    maxBuffer: 10 * 1024 * 1024,
                },
            );

            const extractedText =
                stdout.trim() || "No text detected on this page.";

            const pngImage =
                await outputPdf.embedPng(imageBytes);

            const imageWidth = pngImage.width;
            const imageHeight = pngImage.height;

            /*
             * Keep the original rendered page size.
             */
            const pageWidth = imageWidth;
            const pageHeight = imageHeight;

            const page = outputPdf.addPage([
                pageWidth,
                pageHeight,
            ]);

            /*
             * Draw the original page image.
             */
            page.drawImage(pngImage, {
                x: 0,
                y: 0,
                width: pageWidth,
                height: pageHeight,
            });

            /*
             * Add OCR text as an invisible text layer.
             *
             * pdf-lib does not provide a true invisible
             * text rendering mode directly, so we use
             * very small white text positioned over
             * the page.
             *
             * This provides searchable text while
             * preserving the visual appearance.
             */
            const lines = extractedText
                .split(/\r?\n/)
                .map((line) => line.trim())
                .filter(Boolean);

            let y = pageHeight - 20;

            for (const line of lines) {
                if (y < 10) {
                    break;
                }

                const safeText = line
                    .replace(/[^\x20-\x7E]/g, " ")
                    .slice(0, 500);

                page.drawText(safeText, {
                    x: 5,
                    y,
                    size: 1,
                    color: rgb(1, 1, 1),
                    opacity: 0.01,
                });

                y -= 8;
            }
        }

        const outputBytes = await outputPdf.save();

        return Buffer.from(outputBytes);
    } finally {
        /*
         * Always clean temporary OCR files.
         */
        await fs.rm(workDir, {
            recursive: true,
            force: true,
        });
    }
}