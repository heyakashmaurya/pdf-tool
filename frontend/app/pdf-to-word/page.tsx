import type { Metadata } from "next";

import PdfToWordTool from "@/components/PdfToWordTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "PDF to Word Converter Online Free",
    description:
        "Convert PDF files to editable Word documents online. Upload a PDF and convert it to DOCX directly from your browser.",
    path: "/pdf-to-word",
    keywords: [
        "PDF to Word",
        "PDF to Word converter",
        "convert PDF to Word",
        "PDF to DOCX",
        "PDF to Word online",
        "PDF to Word converter free",
        "convert PDF to DOCX online",
    ],
});

export default function PdfToWordPage() {
    return (
        <>
            <StructuredData
                name="PDF to Word Converter"
                description="Convert PDF files to editable Word documents online."
                path="/pdf-to-word"
            />

            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        PDF to Word Converter
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Convert PDF files to editable Word documents
                        online. Upload your PDF and download the
                        converted DOCX file.
                    </p>
                </div>
            </section>

            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <PdfToWordTool />
            </main>

            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Convert PDF to Word online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Convert a PDF document into an editable
                            Microsoft Word file. Upload your PDF and
                            the conversion service will create a
                            DOCX document that you can download.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to convert PDF to Word
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your PDF.</strong>{" "}
                                Choose the PDF document you want to
                                convert.
                            </li>

                            <li>
                                <strong>2. Start the conversion.</strong>{" "}
                                Click Convert to Word.
                            </li>

                            <li>
                                <strong>3. Wait for processing.</strong>{" "}
                                The PDF is processed by the conversion
                                backend.
                            </li>

                            <li>
                                <strong>4. Download the Word file.</strong>{" "}
                                Your converted DOCX document will
                                download automatically.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this PDF to Word converter free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current version is designed to provide
                            PDF to Word conversion without requiring
                            desktop PDF editing software.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            What type of PDFs can be converted?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current conversion engine works best
                            with PDFs containing selectable text.
                            Scanned or image-only PDFs require OCR to
                            extract their text.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I convert a PDF to DOCX?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. The generated file is a
                                    Microsoft Word DOCX document.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I convert a scanned PDF?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Scanned PDFs are image-based and
                                    require OCR before their text can
                                    be converted into an editable Word
                                    document.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Is there a file size limit?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    The current version accepts PDF
                                    files up to 50 MB.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <RelatedTools
                tools={[
                    {
                        href: "/word-to-pdf",
                        title: "Word to PDF",
                        description:
                            "Convert Word documents to PDF files.",
                    },
                    {
                        href: "/pdf-to-excel",
                        title: "PDF to Excel",
                        description:
                            "Extract PDF data into an Excel workbook.",
                    },
                    {
                        href: "/pdf-to-jpg",
                        title: "PDF to JPG",
                        description:
                            "Convert PDF pages into JPG images.",
                    },
                    {
                        href: "/pdf-to-png",
                        title: "PDF to PNG",
                        description:
                            "Convert PDF pages into PNG images.",
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