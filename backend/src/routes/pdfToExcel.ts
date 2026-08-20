import { Router } from "express";
import multer from "multer";
import path from "path";

import {
    convertPdfToExcel,
} from "../services/pdfToExcelService";

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 50 * 1024 * 1024,
    },

    fileFilter: (
        _req,
        file,
        callback,
    ) => {
        const extension =
            path
                .extname(
                    file.originalname,
                )
                .toLowerCase();

        if (extension === ".pdf") {
            callback(null, true);
            return;
        }

        callback(
            new Error(
                "Please upload a PDF file.",
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

            const excelBuffer =
                await convertPdfToExcel(
                    req.file.buffer,
                );

            const originalName =
                path.basename(
                    req.file.originalname,
                    path.extname(
                        req.file.originalname,
                    ),
                );

            const downloadName =
                `${originalName}.xlsx`;

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            );

            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${downloadName}"`,
            );

            res.setHeader(
                "Content-Length",
                excelBuffer.length.toString(),
            );

            return res.send(
                excelBuffer,
            );
        } catch (error) {
            console.error(
                "PDF-to-Excel error:",
                error,
            );

            if (
                error instanceof Error
            ) {
                return res.status(500).json({
                    success: false,
                    message:
                        error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message:
                    "Could not convert the PDF to Excel.",
            });
        }
    },
);

export default router;