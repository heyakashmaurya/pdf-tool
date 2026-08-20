import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pdfToWordRouter from "./routes/pdfToWord.js";
import wordToPdfRouter from "./routes/wordToPdf";
import pdfToExcelRouter from "./routes/pdfToExcel";
import ocrPdfRouter from "./routes/ocrPdf";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 5000;

app.use(
    cors({
        origin:
            process.env.FRONTEND_URL ||
            "http://localhost:3000",
    }),
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({
        success: true,
        message: "PDF tools backend is running.",
    });
});

app.use("/api/pdf-to-word", pdfToWordRouter);
app.use("/api/word-to-pdf", wordToPdfRouter);
app.use("/api/pdf-to-excel",pdfToExcelRouter,);
app.use("/api/ocr-pdf", ocrPdfRouter);

app.use(
    (
        error: unknown,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
    ) => {
        console.error(error);

        if (
            error instanceof Error &&
            error.message
        ) {
            res.status(400).json({
                success: false,
                message: error.message,
            });

            return;
        }

        res.status(500).json({
            success: false,
            message: "Something went wrong.",
        });
    },
);

app.listen(PORT, () => {
    console.log(
        `Backend running on http://localhost:${PORT}`,
    );
});