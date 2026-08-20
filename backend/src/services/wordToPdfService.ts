
import fs from "fs/promises";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const MAX_FILE_SIZE =
    50 * 1024 * 1024;

export async function convertWordToPdf(
    fileBuffer: Buffer,
    originalFileName: string,
): Promise<Buffer> {

    // --------------------------------------------------
    // Validate extension
    // --------------------------------------------------

    const extension = path
        .extname(originalFileName)
        .toLowerCase();

    if (
        extension !== ".docx" &&
        extension !== ".doc"
    ) {
        throw new Error(
            "Only DOC and DOCX files are supported.",
        );
    }

    // --------------------------------------------------
    // Validate file size
    // --------------------------------------------------

    if (
        fileBuffer.length >
        MAX_FILE_SIZE
    ) {
        throw new Error(
            "Word file is too large. Maximum allowed size is 50 MB.",
        );
    }

    // --------------------------------------------------
    // Create temporary directory
    // --------------------------------------------------

    const temporaryDirectory =
        await fs.mkdtemp(
            path.join(
                os.tmpdir(),
                "word-to-pdf-",
            ),
        );

    try {

        // --------------------------------------------------
        // Create input file
        // --------------------------------------------------

        const inputFileName =
            `input${extension}`;

        const inputPath =
            path.join(
                temporaryDirectory,
                inputFileName,
            );

        await fs.writeFile(
            inputPath,
            fileBuffer,
        );

        // --------------------------------------------------
        // LibreOffice executable
        // --------------------------------------------------

        const libreOfficePath =
            process.env.LIBREOFFICE_PATH ||
            (
                process.platform === "win32"
                    ? "C:\\Program Files\\LibreOffice\\program\\soffice.exe"
                    : "libreoffice"
            );

        // --------------------------------------------------
        // Create isolated LibreOffice profile
        // --------------------------------------------------

        const libreOfficeProfile =
            path.join(
                temporaryDirectory,
                "lo-profile",
            );

        await fs.mkdir(
            libreOfficeProfile,
            {
                recursive: true,
            },
        );

        // --------------------------------------------------
        // Convert DOC/DOCX → PDF
        // --------------------------------------------------

        try {

            await execFileAsync(
                libreOfficePath,
                [
                    "--headless",

                    "--convert-to",
                    "pdf",

                    "--outdir",
                    temporaryDirectory,

                    `-env:UserInstallation=file://${libreOfficeProfile}`,

                    inputPath,
                ],
                {
                    timeout: 120000,
                    windowsHide: true,
                    maxBuffer:
                        10 * 1024 * 1024,
                },
            );

        } catch (error) {

            console.error(
                "LibreOffice conversion error:",
                error,
            );

            if (
                error instanceof Error &&
                error.message.includes(
                    "ENOENT",
                )
            ) {
                throw new Error(
                    "LibreOffice is not installed or could not be found.",
                );
            }

            throw new Error(
                "LibreOffice could not convert the Word document to PDF.",
            );
        }

        // --------------------------------------------------
        // Find generated PDF
        // --------------------------------------------------

        const outputPath =
            path.join(
                temporaryDirectory,
                "input.pdf",
            );

        // --------------------------------------------------
        // Verify output exists
        // --------------------------------------------------

        try {

            await fs.access(
                outputPath,
            );

        } catch {

            throw new Error(
                "LibreOffice did not generate a PDF file.",
            );
        }

        // --------------------------------------------------
        // Read generated PDF
        // --------------------------------------------------

        const pdfBuffer =
            await fs.readFile(
                outputPath,
            );

        if (
            !pdfBuffer.length
        ) {
            throw new Error(
                "The generated PDF is empty.",
            );
        }

        return pdfBuffer;

    } finally {

        // --------------------------------------------------
        // Cleanup
        // --------------------------------------------------

        try {

            await fs.rm(
                temporaryDirectory,
                {
                    recursive: true,
                    force: true,
                },
            );

        } catch (cleanupError) {

            console.error(
                "Temporary Word-to-PDF cleanup failed:",
                cleanupError,
            );
        }
    }
}



// import fs from "fs/promises";
// import os from "os";
// import path from "path";
// import { execFile } from "child_process";
// import { promisify } from "util";

// const execFileAsync = promisify(execFile);

// export async function convertWordToPdf(
//     fileBuffer: Buffer,
//     originalFileName: string,
// ): Promise<Buffer> {
//     const extension = path
//         .extname(originalFileName)
//         .toLowerCase();

//     if (extension !== ".docx" && extension !== ".doc") {
//         throw new Error(
//             "Only DOC and DOCX files are supported.",
//         );
//     }

//     const temporaryDirectory = await fs.mkdtemp(
//         path.join(
//             os.tmpdir(),
//             "word-to-pdf-",
//         ),
//     );

//     try {
//         const inputFileName = `input${extension}`;

//         const inputPath = path.join(
//             temporaryDirectory,
//             inputFileName,
//         );

//         await fs.writeFile(
//             inputPath,
//             fileBuffer,
//         );

//         // const libreOfficePath =
//         //     process.env.LIBREOFFICE_PATH ||
//         //     (process.platform === "win32"
//         //         ? "C:\\Program Files\\LibreOffice\\program\\soffice.exe"
//         //         : "libreoffice");

//         const libreOfficePath =
//             process.env.LIBREOFFICE_PATH ||
//             (process.platform === "win32"
//                 ? "C:\\Program Files\\LibreOffice\\program\\soffice.exe"
//                 : "libreoffice");

//         await execFileAsync(
//             libreOfficePath,
//             [
//                 "--headless",
//                 "--convert-to",
//                 "pdf",
//                 "--outdir",
//                 temporaryDirectory,
//                 inputPath,
//             ],
//             {
//                 timeout: 120000,
//                 windowsHide: true,
//             },
//         );

//         const outputPath = path.join(
//             temporaryDirectory,
//             "input.pdf",
//         );

//         const pdfBuffer = await fs.readFile(
//             outputPath,
//         );

//         if (!pdfBuffer.length) {
//             throw new Error(
//                 "The generated PDF is empty.",
//             );
//         }

//         return pdfBuffer;
//     } finally {
//         try {
//             await fs.rm(
//                 temporaryDirectory,
//                 {
//                     recursive: true,
//                     force: true,
//                 },
//             );
//         } catch (cleanupError) {
//             console.error(
//                 "Temporary Word-to-PDF cleanup failed:",
//                 cleanupError,
//             );
//         }
//     }
// }