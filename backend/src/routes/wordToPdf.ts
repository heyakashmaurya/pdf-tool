import { Router } from "express";
import multer from "multer";
import path from "path";

import { convertWordToPdf } from "../services/wordToPdfService";

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 50 * 1024 * 1024,
    },

    fileFilter: (_req, file, callback) => {
        const extension = path
            .extname(file.originalname)
            .toLowerCase();

        if (
            extension === ".docx" ||
            extension === ".doc"
        ) {
            callback(null, true);
            return;
        }

        callback(
            new Error(
                "Please upload a DOC or DOCX Word document.",
            ),
        );
    },
});

router.post(
    "/",
    upload.single("file"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Field name missing",
                });
            }

            const pdfBuffer =
                await convertWordToPdf(
                    req.file.buffer,
                    req.file.originalname,
                );

            const originalName =
                path.basename(
                    req.file.originalname,
                    path.extname(
                        req.file.originalname,
                    ),
                );

            const downloadName =
                `${originalName}.pdf`;

            res.setHeader(
                "Content-Type",
                "application/pdf",
            );

            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${downloadName}"`,
            );

            res.setHeader(
                "Content-Length",
                pdfBuffer.length.toString(),
            );

            return res.send(pdfBuffer);
        } catch (error) {
            console.error(
                "Word-to-PDF route error:",
                error,
            );

            if (
                error instanceof Error &&
                error.message.includes(
                    "ENOENT",
                )
            ) {
                return res.status(500).json({
                    success: false,
                    message:
                        "LibreOffice was not found. Please install LibreOffice or configure LIBREOFFICE_PATH.",
                });
            }

            if (error instanceof Error) {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message:
                    "Could not convert the Word document to PDF.",
            });
        }
    },
);

export default router;