import type { Metadata } from "next";

import PdfToExcelTool from "@/components/PdfToExcelTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata =
    createToolMetadata({
        title: "PDF to Excel Converter Online Free",
        description:
            "Convert PDF files to Excel spreadsheets online for free. Extract text and table data from PDF pages into an XLSX workbook.",
        path: "/pdf-to-excel",
        keywords: [
            "PDF to Excel",
            "PDF to Excel converter",
            "convert PDF to Excel",
            "PDF to XLSX",
            "PDF to XLSX converter",
            "PDF table to Excel",
            "PDF to Excel online",
            "PDF to Excel free",
        ],
    });

export default function PdfToExcelPage() {
    return (
        <>
            <StructuredData
                name="PDF to Excel Converter"
                description="Convert PDF files into Excel spreadsheets online."
                path="/pdf-to-excel"
            />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        PDF to Excel Converter
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Convert PDF files into Excel
                        spreadsheets. Extract readable
                        text and table data from your PDF
                        and download it as an XLSX file.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <PdfToExcelTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Convert PDF to Excel online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Convert PDF documents into Excel
                            spreadsheets with this online
                            PDF to Excel converter. The tool
                            extracts readable text and
                            table-like data from PDF pages
                            and creates an XLSX workbook.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to convert PDF to Excel
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>
                                    1. Upload your PDF.
                                </strong>{" "}
                                Select the PDF document
                                containing the data you want
                                to extract.
                            </li>

                            <li>
                                <strong>
                                    2. Start the conversion.
                                </strong>{" "}
                                Click Convert to Excel.
                            </li>

                            <li>
                                <strong>
                                    3. Extract the data.
                                </strong>{" "}
                                The backend processes the
                                readable PDF text and
                                organizes it into Excel
                                worksheets.
                            </li>

                            <li>
                                <strong>
                                    4. Download your Excel
                                    file.
                                </strong>{" "}
                                The generated XLSX workbook
                                will download automatically.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            What does PDF to Excel extract?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current version is designed
                            primarily for text-based PDFs
                            containing table-like data. Each
                            PDF page is placed into a
                            separate worksheet in the
                            generated Excel workbook.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Can I convert scanned PDFs?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current PDF to Excel version
                            works with PDFs containing
                            selectable text. Scanned or
                            image-only PDFs may require OCR
                            before their data can be extracted.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this PDF to Excel converter
                            free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. The current tool provides a
                            free way to extract readable PDF
                            data into an Excel XLSX workbook.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I convert PDF to XLSX?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. The generated
                                    workbook uses the XLSX
                                    format supported by
                                    Microsoft Excel and other
                                    spreadsheet applications.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Does each PDF page become
                                    a worksheet?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. The current
                                    implementation creates a
                                    separate worksheet for
                                    each PDF page containing
                                    readable data.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    What is the maximum PDF
                                    size?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    The current upload limit
                                    is 50 MB.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Will complicated PDF
                                    tables always convert
                                    perfectly?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Not necessarily. PDF
                                    layouts can vary
                                    significantly. The current
                                    version works best with
                                    clean, text-based,
                                    table-like layouts.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Related tools */}
            <RelatedTools
                tools={[
                    {
                        href: "/pdf-to-word",
                        title: "PDF to Word",
                        description:
                            "Convert PDF documents into editable Word files.",
                    },
                    {
                        href: "/word-to-pdf",
                        title: "Word to PDF",
                        description:
                            "Convert DOC and DOCX documents into PDF files.",
                    },
                    {
                        href: "/pdf-to-png",
                        title: "PDF to PNG",
                        description:
                            "Convert PDF pages into PNG images.",
                    },
                    {
                        href: "/pdf-to-jpg",
                        title: "PDF to JPG",
                        description:
                            "Convert PDF pages into JPG images.",
                    },
                    {
                        href: "/compress-pdf",
                        title: "Compress PDF",
                        description:
                            "Reduce PDF file size online.",
                    },
                ]}
            />
        </>
    );
}