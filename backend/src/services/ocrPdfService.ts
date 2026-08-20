

import fs from "fs/promises";
import path from "path";
import os from "os";
import { execFile } from "child_process";
import { promisify } from "util";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import dotenv from "dotenv";

dotenv.config();

const execFileAsync = promisify(execFile);

// ======================================================
// CONFIGURATION
// ======================================================

const TESSERACT_PATH = process.env.TESSERACT_PATH;
const PDFTOPPM_PATH = process.env.PDFTOPPM_PATH;

const OCR_LANGUAGE = process.env.OCR_LANGUAGE || "eng";

const MAX_PAGES = Number(process.env.OCR_MAX_PAGES || 50);

const MAX_FILE_SIZE_MB = Number(
    process.env.OCR_MAX_FILE_SIZE_MB || 25
);

const MAX_FILE_SIZE =
    MAX_FILE_SIZE_MB * 1024 * 1024;

const OCR_DPI = Number(
    process.env.OCR_DPI || 150
);

// ======================================================
// VALIDATE CONFIGURATION
// ======================================================

if (!TESSERACT_PATH) {
    console.warn(
        "TESSERACT_PATH is not configured."
    );
}

if (!PDFTOPPM_PATH) {
    console.warn(
        "PDFTOPPM_PATH is not configured."
    );
}

// ======================================================
// OCR PDF
// ======================================================

export async function ocrPdf(
    inputPdfPath: string
): Promise<Buffer> {

    // --------------------------------------------------
    // Validate input file
    // --------------------------------------------------

    try {
        await fs.access(inputPdfPath);
    } catch {
        throw new Error(
            "Input PDF file does not exist."
        );
    }

    // --------------------------------------------------
    // Check file size
    // --------------------------------------------------

    const fileStats = await fs.stat(inputPdfPath);

    if (fileStats.size > MAX_FILE_SIZE) {
        throw new Error(
            `PDF file is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`
        );
    }

    // --------------------------------------------------
    // Check required external programs
    // --------------------------------------------------

    if (!TESSERACT_PATH) {
        throw new Error(
            "Tesseract is not configured. Please set TESSERACT_PATH."
        );
    }

    if (!PDFTOPPM_PATH) {
        throw new Error(
            "Poppler is not configured. Please set PDFTOPPM_PATH."
        );
    }

    // --------------------------------------------------
    // Create temporary directory
    // --------------------------------------------------

    const workDir = await fs.mkdtemp(
        path.join(os.tmpdir(), "ocr-pdf-")
    );

    try {

        // ==================================================
        // STEP 1 — CHECK PDF PAGE COUNT
        // ==================================================

        const pageCount = await getPdfPageCount(
            inputPdfPath
        );

        if (pageCount > MAX_PAGES) {
            throw new Error(
                `PDF contains ${pageCount} pages. Maximum allowed is ${MAX_PAGES} pages.`
            );
        }

        if (pageCount === 0) {
            throw new Error(
                "The PDF does not contain any pages."
            );
        }

        // ==================================================
        // STEP 2 — CONVERT PDF TO PNG
        // ==================================================

        const outputPrefix = path.join(
            workDir,
            "page"
        );

        await execFileAsync(
            PDFTOPPM_PATH,
            [
                "-png",
                "-r",
                String(OCR_DPI),
                "-f",
                "1",
                "-l",
                String(pageCount),
                inputPdfPath,
                outputPrefix,
            ],
            {
                windowsHide: true,
                maxBuffer: 20 * 1024 * 1024,
                timeout: 120_000,
            }
        );

        // ==================================================
        // STEP 3 — FIND GENERATED IMAGES
        // ==================================================

        const files = await fs.readdir(workDir);

        const imageFiles = files
            .filter(
                (file) =>
                    file.startsWith("page-") &&
                    file.toLowerCase().endsWith(".png")
            )
            .sort((a, b) => {

                const pageA = extractPageNumber(a);
                const pageB = extractPageNumber(b);

                return pageA - pageB;
            });

        if (imageFiles.length === 0) {
            throw new Error(
                "Poppler could not convert the PDF into images."
            );
        }

        if (imageFiles.length !== pageCount) {
            throw new Error(
                `Expected ${pageCount} rendered pages but received ${imageFiles.length}.`
            );
        }

        // ==================================================
        // STEP 4 — CREATE OUTPUT PDF
        // ==================================================

        const outputPdf =
            await PDFDocument.create();

        const font =
            await outputPdf.embedFont(
                StandardFonts.Helvetica
            );

        // ==================================================
        // STEP 5 — OCR EACH PAGE
        // ==================================================

        for (const imageFile of imageFiles) {

            const imagePath = path.join(
                workDir,
                imageFile
            );

            const imageBytes =
                await fs.readFile(imagePath);

            // ------------------------------------------------
            // Run Tesseract
            // ------------------------------------------------

            const { stdout } =
                await execFileAsync(
                    TESSERACT_PATH,
                    [
                        imagePath,
                        "stdout",
                        "-l",
                        OCR_LANGUAGE,
                        "--psm",
                        "3",
                    ],
                    {
                        windowsHide: true,
                        maxBuffer:
                            10 * 1024 * 1024,
                        timeout: 60_000,
                    }
                );

            const extractedText =
                stdout.trim();

            // ------------------------------------------------
            // Embed original page image
            // ------------------------------------------------

            const pngImage =
                await outputPdf.embedPng(
                    imageBytes
                );

            const pageWidth =
                pngImage.width;

            const pageHeight =
                pngImage.height;

            const page =
                outputPdf.addPage([
                    pageWidth,
                    pageHeight,
                ]);

            // ------------------------------------------------
            // Draw original page
            // ------------------------------------------------

            page.drawImage(pngImage, {
                x: 0,
                y: 0,
                width: pageWidth,
                height: pageHeight,
            });

            // ------------------------------------------------
            // Add searchable OCR text
            // ------------------------------------------------

            if (extractedText) {

                const lines =
                    extractedText
                        .split(/\r?\n/)
                        .map((line) =>
                            line.trim()
                        )
                        .filter(Boolean);

                let y =
                    pageHeight - 20;

                for (const line of lines) {

                    if (y < 10) {
                        break;
                    }

                    // Keep Unicode characters.
                    // pdf-lib's standard Helvetica font
                    // cannot render every Unicode character,
                    // so unsupported characters are replaced.
                    const safeText =
                        sanitizeText(line);

                    if (!safeText) {
                        continue;
                    }

                    page.drawText(
                        safeText,
                        {
                            x: 5,
                            y,
                            size: 1,
                            font,
                            color: rgb(
                                1,
                                1,
                                1
                            ),
                            opacity: 0.01,
                        }
                    );

                    y -= 8;
                }
            }
        }

        // ==================================================
        // STEP 6 — SAVE OUTPUT PDF
        // ==================================================

        const outputBytes =
            await outputPdf.save();

        return Buffer.from(
            outputBytes
        );

    } finally {

        // ==================================================
        // CLEAN TEMPORARY FILES
        // ==================================================

        await fs.rm(
            workDir,
            {
                recursive: true,
                force: true,
            }
        );
    }
}

// ======================================================
// GET PDF PAGE COUNT
// ======================================================

async function getPdfPageCount(
    pdfPath: string
): Promise<number> {

    const pdfBytes =
        await fs.readFile(pdfPath);

    const pdf =
        await PDFDocument.load(
            pdfBytes,
            {
                ignoreEncryption: true,
            }
        );

    return pdf.getPageCount();
}

// ======================================================
// EXTRACT PAGE NUMBER
// ======================================================

function extractPageNumber(
    filename: string
): number {

    const match =
        filename.match(
            /-(\d+)\.png$/i
        );

    if (!match) {
        return 0;
    }

    return Number(match[1]);
}

// ======================================================
// SANITIZE OCR TEXT
// ======================================================

function sanitizeText(
    text: string
): string {

    return text
        // Remove control characters
        .replace(
            /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,
            " "
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim()
        .slice(0, 500);
}



// import fs from "fs/promises";
// import path from "path";
// import os from "os";
// import { execFile } from "child_process";
// import { promisify } from "util";
// import { PDFDocument, rgb } from "pdf-lib";
// import dotenv from "dotenv"
// dotenv.config()

// const execFileAsync = promisify(execFile);

// const TESSERACT_PATH =
//     process.env.TESSERACT_PATH ||
//     "C:\\Program Files\\Tesseract-OCR\\tesseract.exe";

// const PDFTOPPM_PATH =
//     process.env.PDFTOPPM_PATH ||
//     "C:\Users\Akash M\Downloads\Release-26.02.0-0\poppler-26.02.0\Library\bin\pdftoppm.exe";

// const MAX_PAGES = 50;

// export async function ocrPdf(
//     inputPdfPath: string,
// ): Promise<Buffer> {
//     const workDir = await fs.mkdtemp(
//         path.join(os.tmpdir(), "ocr-pdf-"),
//     );

//     try {
//         const outputPrefix = path.join(workDir, "page");

//         /*
//          * Convert PDF pages into PNG images.
//          *
//          * -png       = PNG output
//          * -r 150     = 150 DPI
//          */
//         await execFileAsync(
//             PDFTOPPM_PATH,
//             [
//                 "-png",
//                 "-r",
//                 "150",
//                 inputPdfPath,
//                 outputPrefix,
//             ],
//             {
//                 windowsHide: true,
//                 maxBuffer: 20 * 1024 * 1024,
//             },
//         );

//         const files = await fs.readdir(workDir);

//         const imageFiles = files
//             .filter(
//                 (file) =>
//                     file.startsWith("page-") &&
//                     file.toLowerCase().endsWith(".png"),
//             )
//             .sort((a, b) => {
//                 const pageA = parseInt(
//                     a.match(/-(\d+)\.png$/)?.[1] || "0",
//                     10,
//                 );

//                 const pageB = parseInt(
//                     b.match(/-(\d+)\.png$/)?.[1] || "0",
//                     10,
//                 );

//                 return pageA - pageB;
//             });

//         if (imageFiles.length === 0) {
//             throw new Error(
//                 "Could not convert the PDF into images.",
//             );
//         }

//         if (imageFiles.length > MAX_PAGES) {
//             throw new Error(
//                 `PDFs are limited to ${MAX_PAGES} pages for OCR.`,
//             );
//         }

//         const outputPdf = await PDFDocument.create();

//         for (const imageFile of imageFiles) {
//             const imagePath = path.join(
//                 workDir,
//                 imageFile,
//             );

//             const imageBytes = await fs.readFile(imagePath);

//             /*
//              * Run Tesseract.
//              *
//              * We use stdout directly so we don't have
//              * to create an additional text file.
//              */
//             const { stdout } = await execFileAsync(
//                 TESSERACT_PATH,
//                 [
//                     imagePath,
//                     "stdout",
//                     "-l",
//                     "eng",
//                     "--psm",
//                     "3",
//                 ],
//                 {
//                     windowsHide: true,
//                     maxBuffer: 10 * 1024 * 1024,
//                 },
//             );

//             const extractedText =
//                 stdout.trim() || "No text detected on this page.";

//             const pngImage =
//                 await outputPdf.embedPng(imageBytes);

//             const imageWidth = pngImage.width;
//             const imageHeight = pngImage.height;

//             /*
//              * Keep the original rendered page size.
//              */
//             const pageWidth = imageWidth;
//             const pageHeight = imageHeight;

//             const page = outputPdf.addPage([
//                 pageWidth,
//                 pageHeight,
//             ]);

//             /*
//              * Draw the original page image.
//              */
//             page.drawImage(pngImage, {
//                 x: 0,
//                 y: 0,
//                 width: pageWidth,
//                 height: pageHeight,
//             });

//             /*
//              * Add OCR text as an invisible text layer.
//              *
//              * pdf-lib does not provide a true invisible
//              * text rendering mode directly, so we use
//              * very small white text positioned over
//              * the page.
//              *
//              * This provides searchable text while
//              * preserving the visual appearance.
//              */
//             const lines = extractedText
//                 .split(/\r?\n/)
//                 .map((line) => line.trim())
//                 .filter(Boolean);

//             let y = pageHeight - 20;

//             for (const line of lines) {
//                 if (y < 10) {
//                     break;
//                 }

//                 const safeText = line
//                     .replace(/[^\x20-\x7E]/g, " ")
//                     .slice(0, 500);

//                 page.drawText(safeText, {
//                     x: 5,
//                     y,
//                     size: 1,
//                     color: rgb(1, 1, 1),
//                     opacity: 0.01,
//                 });

//                 y -= 8;
//             }
//         }

//         const outputBytes = await outputPdf.save();

//         return Buffer.from(outputBytes);
//     } finally {
//         /*
//          * Always clean temporary OCR files.
//          */
//         await fs.rm(workDir, {
//             recursive: true,
//             force: true,
//         });
//     }
// }