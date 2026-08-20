import { PDFParse } from "pdf-parse";
import {
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TextRun,
} from "docx";

export async function convertPdfToWord(
    pdfBuffer: Buffer,
): Promise<Buffer> {
    const parser = new PDFParse({
        data: pdfBuffer,
    });

    try {
        const result = await parser.getText();

        const text = result.text?.trim();

        if (!text) {
            throw new Error(
                "No readable text was found in this PDF. Scanned or image-only PDFs require OCR.",
            );
        }

        const lines = text
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);

        const paragraphs = lines.map(
            (line) =>
                new Paragraph({
                    children: [
                        new TextRun({
                            text: line,
                        }),
                    ],
                }),
        );

        const document = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            text: "Converted PDF",
                            heading: HeadingLevel.TITLE,
                        }),

                        ...paragraphs,
                    ],
                },
            ],
        });

        return await Packer.toBuffer(document);
    } finally {
        await parser.destroy();
    }
}