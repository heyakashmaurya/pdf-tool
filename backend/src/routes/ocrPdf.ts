import { Router, Request, Response } from "express";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { ocrPdf } from "../services/ocrPdfService";
// import { ocrPdf } from "../services/ocrPdfService";


const router = Router();

const upload = multer({
    dest: path.join(os.tmpdir(), "pdf-tool-ocr"),
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
});

router.post(
    "/",
    upload.single("file"),
    async (req: Request, res: Response) => {
        let inputPath: string | undefined;

        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "PDF file is required.",
                });
            }

            inputPath = req.file.path;

            if (
                req.file.mimetype !==
                "application/pdf"
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Only PDF files are allowed.",
                });
            }

            const outputPdf = await ocrPdf(inputPath);

            res.setHeader(
                "Content-Type",
                "application/pdf",
            );

            res.setHeader(
                "Content-Disposition",
                'attachment; filename="ocr-pdf.pdf"',
            );

            return res.send(outputPdf);
        } catch (error) {
            console.error("OCR PDF error:", error);

            return res.status(500).json({
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to process PDF.",
            });
        } finally {
            if (inputPath) {
                await fs
                    .unlink(inputPath)
                    .catch(() => {});
            }
        }
    },
);

export default router;