import fs from "fs/promises";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function convertWordToPdf(
    fileBuffer: Buffer,
    originalFileName: string,
): Promise<Buffer> {
    const extension = path
        .extname(originalFileName)
        .toLowerCase();

    if (extension !== ".docx" && extension !== ".doc") {
        throw new Error(
            "Only DOC and DOCX files are supported.",
        );
    }

    const temporaryDirectory = await fs.mkdtemp(
        path.join(
            os.tmpdir(),
            "word-to-pdf-",
        ),
    );

    try {
        const inputFileName = `input${extension}`;

        const inputPath = path.join(
            temporaryDirectory,
            inputFileName,
        );

        await fs.writeFile(
            inputPath,
            fileBuffer,
        );

        const libreOfficePath =
            process.env.LIBREOFFICE_PATH ||
            (process.platform === "win32"
                ? "C:\\Program Files\\LibreOffice\\program\\soffice.exe"
                : "libreoffice");

        await execFileAsync(
            libreOfficePath,
            [
                "--headless",
                "--convert-to",
                "pdf",
                "--outdir",
                temporaryDirectory,
                inputPath,
            ],
            {
                timeout: 120000,
                windowsHide: true,
            },
        );

        const outputPath = path.join(
            temporaryDirectory,
            "input.pdf",
        );

        const pdfBuffer = await fs.readFile(
            outputPath,
        );

        if (!pdfBuffer.length) {
            throw new Error(
                "The generated PDF is empty.",
            );
        }

        return pdfBuffer;
    } finally {
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