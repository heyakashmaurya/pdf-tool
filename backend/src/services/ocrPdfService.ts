


import fs from "fs/promises";
import path from "path";
import os from "os";
import { execFile } from "child_process";
import { promisify } from "util";
import {
    PDFDocument,
    rgb,
    StandardFonts,
} from "pdf-lib";
import dotenv from "dotenv";

dotenv.config();

const execFileAsync = promisify(execFile);

// ======================================================
// EXTERNAL PROGRAM CONFIGURATION
// ======================================================
//
// Windows:
//   Uses your local Tesseract / Poppler installation.
//
// Docker / Render Linux:
//   Uses programs installed by the Dockerfile and
//   available through PATH.
//

const TESSERACT_PATH =
    process.env.TESSERACT_PATH ||
    (process.platform === "win32"
        ? "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"
        : "tesseract");

const PDFTOPPM_PATH =
    process.env.PDFTOPPM_PATH ||
    (process.platform === "win32"
        ? "C:\\Users\\Akash M\\Downloads\\Release-26.02.0-0\\poppler-26.02.0\\Library\\bin\\pdftoppm.exe"
        : "pdftoppm");

// ======================================================
// OCR CONFIGURATION
// ======================================================

const OCR_LANGUAGE =
    process.env.OCR_LANGUAGE || "eng";

// Render Free has limited CPU/RAM.
// Keep OCR limits conservative.

const MAX_PAGES = Number(
    process.env.OCR_MAX_PAGES || 10
);

const MAX_FILE_SIZE_MB = Number(
    process.env.OCR_MAX_FILE_SIZE_MB || 10
);

const MAX_FILE_SIZE =
    MAX_FILE_SIZE_MB * 1024 * 1024;

// Lower DPI reduces memory usage significantly.

const OCR_DPI = Number(
    process.env.OCR_DPI || 120
);

// Time allowed for Poppler to render PDF.

const PDF_RENDER_TIMEOUT = 180_000;

// Time allowed for Tesseract to OCR each page.

const TESSERACT_TIMEOUT = 180_000;

// ======================================================
// OCR PDF
// ======================================================

export async function ocrPdf(
    inputPdfPath: string
): Promise<Buffer> {

    // --------------------------------------------------
    // Validate input
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

    const fileStats =
        await fs.stat(inputPdfPath);

    if (fileStats.size > MAX_FILE_SIZE) {
        throw new Error(
            `PDF file is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`
        );
    }

    // --------------------------------------------------
    // Create temporary directory
    // --------------------------------------------------

    const workDir =
        await fs.mkdtemp(
            path.join(
                os.tmpdir(),
                "ocr-pdf-"
            )
        );

    try {

        // ==================================================
        // STEP 1 — CHECK PDF PAGE COUNT
        // ==================================================

        const pageCount =
            await getPdfPageCount(
                inputPdfPath
            );

        if (pageCount === 0) {
            throw new Error(
                "The PDF does not contain any pages."
            );
        }

        if (pageCount > MAX_PAGES) {
            throw new Error(
                `PDF contains ${pageCount} pages. Maximum allowed is ${MAX_PAGES} pages for OCR.`
            );
        }

        // ==================================================
        // STEP 2 — CONVERT PDF TO PNG
        // ==================================================

        const outputPrefix =
            path.join(
                workDir,
                "page"
            );

        console.log(
            `OCR: Rendering ${pageCount} page(s) at ${OCR_DPI} DPI`
        );

        try {

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

                    timeout:
                        PDF_RENDER_TIMEOUT,

                    maxBuffer:
                        20 * 1024 * 1024,
                }
            );

        } catch (error) {

            console.error(
                "Poppler PDF rendering error:",
                error
            );

            throw new Error(
                "Could not convert the PDF into images. Please try a smaller PDF."
            );
        }

        // ==================================================
        // STEP 3 — FIND GENERATED PNG FILES
        // ==================================================

        const files =
            await fs.readdir(
                workDir
            );

        const imageFiles =
            files
                .filter(
                    (file) =>
                        file.startsWith(
                            "page-"
                        ) &&
                        file
                            .toLowerCase()
                            .endsWith(
                                ".png"
                            )
                )
                .sort(
                    (a, b) =>
                        extractPageNumber(a) -
                        extractPageNumber(b)
                );

        if (
            imageFiles.length === 0
        ) {
            throw new Error(
                "Poppler could not convert the PDF into images."
            );
        }

        if (
            imageFiles.length !==
            pageCount
        ) {
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

        for (
            let index = 0;
            index < imageFiles.length;
            index++
        ) {

            const imageFile =
                imageFiles[index];

            const pageNumber =
                index + 1;

            console.log(
                `OCR: Processing page ${pageNumber}/${pageCount}`
            );

            const imagePath =
                path.join(
                    workDir,
                    imageFile
                );

            const imageBytes =
                await fs.readFile(
                    imagePath
                );

            // ------------------------------------------------
            // Run Tesseract
            // ------------------------------------------------

            let extractedText = "";

            try {

                const result =
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

                            timeout:
                                TESSERACT_TIMEOUT,

                            maxBuffer:
                                20 * 1024 * 1024,
                        }
                    );

                extractedText =
                    result.stdout.trim();

            } catch (error) {

                console.error(
                    `Tesseract error on page ${pageNumber}:`,
                    error
                );

                // If Tesseract is killed because the
                // document is too heavy, give the user
                // a useful error instead of returning
                // a generic 500.

                if (
                    error &&
                    typeof error === "object" &&
                    "signal" in error &&
                    error.signal === "SIGTERM"
                ) {
                    throw new Error(
                        `OCR processing was stopped on page ${pageNumber}. The PDF may be too large or complex. Please try a smaller PDF.`
                    );
                }

                throw new Error(
                    `Tesseract could not process page ${pageNumber}.`
                );
            }

            // ------------------------------------------------
            // Embed page image
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
                outputPdf.addPage(
                    [
                        pageWidth,
                        pageHeight,
                    ]
                );

            // ------------------------------------------------
            // Draw original page image
            // ------------------------------------------------

            page.drawImage(
                pngImage,
                {
                    x: 0,
                    y: 0,

                    width:
                        pageWidth,

                    height:
                        pageHeight,
                }
            );

            // ------------------------------------------------
            // Add searchable OCR text
            // ------------------------------------------------

            if (extractedText) {

                const lines =
                    extractedText
                        .split(
                            /\r?\n/
                        )
                        .map(
                            (line) =>
                                line.trim()
                        )
                        .filter(Boolean);

                let y =
                    pageHeight - 20;

                for (
                    const line of lines
                ) {

                    if (y < 10) {
                        break;
                    }

                    const safeText =
                        sanitizeText(
                            line
                        );

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

                            color:
                                rgb(
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

            // ------------------------------------------------
            // Delete PNG immediately after processing
            // ------------------------------------------------
            //
            // This is important for Render memory usage.
            //

            try {

                await fs.unlink(
                    imagePath
                );

            } catch (cleanupError) {

                console.warn(
                    `Could not delete temporary image ${imageFile}:`,
                    cleanupError
                );
            }
        }

        // ==================================================
        // STEP 6 — SAVE OUTPUT PDF
        // ==================================================

        console.log(
            "OCR: Saving searchable PDF..."
        );

        const outputBytes =
            await outputPdf.save();

        console.log(
            `OCR: Completed successfully (${outputBytes.length} bytes)`
        );

        return Buffer.from(
            outputBytes
        );

    } finally {

        // ==================================================
        // CLEAN TEMPORARY DIRECTORY
        // ==================================================

        try {

            await fs.rm(
                workDir,
                {
                    recursive: true,
                    force: true,
                }
            );

        } catch (cleanupError) {

            console.error(
                "OCR temporary directory cleanup failed:",
                cleanupError
            );
        }
    }
}

// ======================================================
// GET PDF PAGE COUNT
// ======================================================

async function getPdfPageCount(
    pdfPath: string
): Promise<number> {

    const pdfBytes =
        await fs.readFile(
            pdfPath
        );

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

    return Number(
        match[1]
    );
}

// ======================================================
// SANITIZE OCR TEXT
// ======================================================

function sanitizeText(
    text: string
): string {

    return text
        .replace(
            /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,
            " "
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim()
        .slice(
            0,
            500
        );
}

// import fs from "fs/promises";
// import path from "path";
// import os from "os";
// import { execFile } from "child_process";
// import { promisify } from "util";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import dotenv from "dotenv";

// dotenv.config();

// const execFileAsync = promisify(execFile);

// // ======================================================
// // CONFIGURATION
// // ======================================================

// const TESSERACT_PATH = process.env.TESSERACT_PATH;
// const PDFTOPPM_PATH = process.env.PDFTOPPM_PATH;

// const OCR_LANGUAGE = process.env.OCR_LANGUAGE || "eng";

// const MAX_PAGES = Number(process.env.OCR_MAX_PAGES || 50);

// const MAX_FILE_SIZE_MB = Number(
//     process.env.OCR_MAX_FILE_SIZE_MB || 25
// );

// const MAX_FILE_SIZE =
//     MAX_FILE_SIZE_MB * 1024 * 1024;

// const OCR_DPI = Number(
//     process.env.OCR_DPI || 150
// );

// // ======================================================
// // VALIDATE CONFIGURATION
// // ======================================================

// if (!TESSERACT_PATH) {
//     console.warn(
//         "TESSERACT_PATH is not configured."
//     );
// }

// if (!PDFTOPPM_PATH) {
//     console.warn(
//         "PDFTOPPM_PATH is not configured."
//     );
// }

// // ======================================================
// // OCR PDF
// // ======================================================

// export async function ocrPdf(
//     inputPdfPath: string
// ): Promise<Buffer> {

//     // --------------------------------------------------
//     // Validate input file
//     // --------------------------------------------------

//     try {
//         await fs.access(inputPdfPath);
//     } catch {
//         throw new Error(
//             "Input PDF file does not exist."
//         );
//     }

//     // --------------------------------------------------
//     // Check file size
//     // --------------------------------------------------

//     const fileStats = await fs.stat(inputPdfPath);

//     if (fileStats.size > MAX_FILE_SIZE) {
//         throw new Error(
//             `PDF file is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`
//         );
//     }

//     // --------------------------------------------------
//     // Check required external programs
//     // --------------------------------------------------

//     if (!TESSERACT_PATH) {
//         throw new Error(
//             "Tesseract is not configured. Please set TESSERACT_PATH."
//         );
//     }

//     if (!PDFTOPPM_PATH) {
//         throw new Error(
//             "Poppler is not configured. Please set PDFTOPPM_PATH."
//         );
//     }

//     // --------------------------------------------------
//     // Create temporary directory
//     // --------------------------------------------------

//     const workDir = await fs.mkdtemp(
//         path.join(os.tmpdir(), "ocr-pdf-")
//     );

//     try {

//         // ==================================================
//         // STEP 1 — CHECK PDF PAGE COUNT
//         // ==================================================

//         const pageCount = await getPdfPageCount(
//             inputPdfPath
//         );

//         if (pageCount > MAX_PAGES) {
//             throw new Error(
//                 `PDF contains ${pageCount} pages. Maximum allowed is ${MAX_PAGES} pages.`
//             );
//         }

//         if (pageCount === 0) {
//             throw new Error(
//                 "The PDF does not contain any pages."
//             );
//         }

//         // ==================================================
//         // STEP 2 — CONVERT PDF TO PNG
//         // ==================================================

//         const outputPrefix = path.join(
//             workDir,
//             "page"
//         );
        

//         await execFileAsync(
//             PDFTOPPM_PATH,
//             [
//                 "-png",
//                 "-r",
//                 String(OCR_DPI),
//                 "-f",
//                 "1",
//                 "-l",
//                 String(pageCount),
//                 inputPdfPath,
//                 outputPrefix,
//             ],
//             {
//                 windowsHide: true,
//                 maxBuffer: 20 * 1024 * 1024,
//                 timeout: 120_000,
//             }
//         );

//         // ==================================================
//         // STEP 3 — FIND GENERATED IMAGES
//         // ==================================================

//         const files = await fs.readdir(workDir);

//         const imageFiles = files
//             .filter(
//                 (file) =>
//                     file.startsWith("page-") &&
//                     file.toLowerCase().endsWith(".png")
//             )
//             .sort((a, b) => {

//                 const pageA = extractPageNumber(a);
//                 const pageB = extractPageNumber(b);

//                 return pageA - pageB;
//             });

//         if (imageFiles.length === 0) {
//             throw new Error(
//                 "Poppler could not convert the PDF into images."
//             );
//         }

//         if (imageFiles.length !== pageCount) {
//             throw new Error(
//                 `Expected ${pageCount} rendered pages but received ${imageFiles.length}.`
//             );
//         }

//         // ==================================================
//         // STEP 4 — CREATE OUTPUT PDF
//         // ==================================================

//         const outputPdf =
//             await PDFDocument.create();

//         const font =
//             await outputPdf.embedFont(
//                 StandardFonts.Helvetica
//             );

//         // ==================================================
//         // STEP 5 — OCR EACH PAGE
//         // ==================================================

//         for (const imageFile of imageFiles) {

//             const imagePath = path.join(
//                 workDir,
//                 imageFile
//             );

//             const imageBytes =
//                 await fs.readFile(imagePath);

//             // ------------------------------------------------
//             // Run Tesseract
//             // ------------------------------------------------

//             const { stdout } =
//                 await execFileAsync(
//                     TESSERACT_PATH,
//                     [
//                         imagePath,
//                         "stdout",
//                         "-l",
//                         OCR_LANGUAGE,
//                         "--psm",
//                         "3",
//                     ],
//                     {
//                         windowsHide: true,
//                         maxBuffer:
//                             10 * 1024 * 1024,
//                         timeout: 60_000,
//                     }
//                 );

//             const extractedText =
//                 stdout.trim();

//             // ------------------------------------------------
//             // Embed original page image
//             // ------------------------------------------------

//             const pngImage =
//                 await outputPdf.embedPng(
//                     imageBytes
//                 );

//             const pageWidth =
//                 pngImage.width;

//             const pageHeight =
//                 pngImage.height;

//             const page =
//                 outputPdf.addPage([
//                     pageWidth,
//                     pageHeight,
//                 ]);

//             // ------------------------------------------------
//             // Draw original page
//             // ------------------------------------------------

//             page.drawImage(pngImage, {
//                 x: 0,
//                 y: 0,
//                 width: pageWidth,
//                 height: pageHeight,
//             });

//             // ------------------------------------------------
//             // Add searchable OCR text
//             // ------------------------------------------------

//             if (extractedText) {

//                 const lines =
//                     extractedText
//                         .split(/\r?\n/)
//                         .map((line) =>
//                             line.trim()
//                         )
//                         .filter(Boolean);

//                 let y =
//                     pageHeight - 20;

//                 for (const line of lines) {

//                     if (y < 10) {
//                         break;
//                     }

//                     // Keep Unicode characters.
//                     // pdf-lib's standard Helvetica font
//                     // cannot render every Unicode character,
//                     // so unsupported characters are replaced.
//                     const safeText =
//                         sanitizeText(line);

//                     if (!safeText) {
//                         continue;
//                     }

//                     page.drawText(
//                         safeText,
//                         {
//                             x: 5,
//                             y,
//                             size: 1,
//                             font,
//                             color: rgb(
//                                 1,
//                                 1,
//                                 1
//                             ),
//                             opacity: 0.01,
//                         }
//                     );

//                     y -= 8;
//                 }
//             }
//         }

//         // ==================================================
//         // STEP 6 — SAVE OUTPUT PDF
//         // ==================================================

//         const outputBytes =
//             await outputPdf.save();

//         return Buffer.from(
//             outputBytes
//         );

//     } finally {

//         // ==================================================
//         // CLEAN TEMPORARY FILES
//         // ==================================================

//         await fs.rm(
//             workDir,
//             {
//                 recursive: true,
//                 force: true,
//             }
//         );
//     }
// }

// // ======================================================
// // GET PDF PAGE COUNT
// // ======================================================

// async function getPdfPageCount(
//     pdfPath: string
// ): Promise<number> {

//     const pdfBytes =
//         await fs.readFile(pdfPath);

//     const pdf =
//         await PDFDocument.load(
//             pdfBytes,
//             {
//                 ignoreEncryption: true,
//             }
//         );

//     return pdf.getPageCount();
// }

// // ======================================================
// // EXTRACT PAGE NUMBER
// // ======================================================

// function extractPageNumber(
//     filename: string
// ): number {

//     const match =
//         filename.match(
//             /-(\d+)\.png$/i
//         );

//     if (!match) {
//         return 0;
//     }

//     return Number(match[1]);
// }

// // ======================================================
// // SANITIZE OCR TEXT
// // ======================================================

// function sanitizeText(
//     text: string
// ): string {

//     return text
//         // Remove control characters
//         .replace(
//             /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,
//             " "
//         )
//         .replace(
//             /\s+/g,
//             " "
//         )
//         .trim()
//         .slice(0, 500);
// }

