import { Router, Request, Response } from "express";
import multer from "multer";
import { convertPdfToWord } from "../services/pdfToWordService.js";

const router = Router();

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter: (_req, file, callback) => {
        if (file.mimetype !== "application/pdf") {
            callback(new Error("Only PDF files are allowed."));
            return;
        }

        callback(null, true);
    },
});

router.post(
    "/",
    upload.single("file"),
    async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                res.status(400).json({
                    success: false,
                    message: "Please upload a PDF file.",
                });

                return;
            }

            const wordBuffer = await convertPdfToWord(
                req.file.buffer,
            );

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            );

            res.setHeader(
                "Content-Disposition",
                'attachment; filename="converted-document.docx"',
            );

            res.setHeader(
                "Content-Length",
                wordBuffer.length.toString(),
            );

            res.status(200).send(wordBuffer);
        } catch (error) {
            console.error("PDF to Word error:", error);

            const message =
                error instanceof Error
                    ? error.message
                    : "PDF to Word conversion failed.";

            res.status(500).json({
                success: false,
                message,
            });
        }
    },
);

export default router;