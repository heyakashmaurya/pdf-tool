import type { Metadata } from "next";

import WordToPdfTool from "@/components/WordToPdfTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata =
    createToolMetadata({
        title: "Word to PDF Converter Online Free",
        description:
            "Convert Word DOC and DOCX files to PDF online for free. Upload a Word document and convert it to PDF quickly.",
        path: "/word-to-pdf",
        keywords: [
            "Word to PDF",
            "Word to PDF converter",
            "DOCX to PDF",
            "DOC to PDF",
            "convert Word to PDF",
            "Word document to PDF",
            "Word to PDF online",
            "Word to PDF free",
        ],
    });

export default function WordToPdfPage() {
    return (
        <>
            <StructuredData
                name="Word to PDF Converter"
                description="Convert Word DOC and DOCX documents to PDF online."
                path="/word-to-pdf"
            />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Word to PDF Converter
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Convert Word DOC and DOCX
                        documents to PDF online.
                        Upload your Word file and
                        download the converted PDF.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <WordToPdfTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Convert Word to PDF online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Convert Word documents to PDF
                            with this online Word to PDF
                            converter. Upload a DOC or DOCX
                            file and the document will be
                            converted into a PDF that you
                            can download.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to convert Word to PDF
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>
                                    1. Upload your Word
                                    document.
                                </strong>{" "}
                                Select a DOC or DOCX file
                                from your device.
                            </li>

                            <li>
                                <strong>
                                    2. Start the conversion.
                                </strong>{" "}
                                Click the Convert to PDF
                                button.
                            </li>

                            <li>
                                <strong>
                                    3. Wait for conversion.
                                </strong>{" "}
                                Your Word document is
                                processed by the PDF
                                conversion backend.
                            </li>

                            <li>
                                <strong>
                                    4. Download your PDF.
                                </strong>{" "}
                                The converted PDF will
                                download automatically.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this Word to PDF converter
                            free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. You can use this Word to PDF
                            converter to convert supported
                            DOC and DOCX documents without
                            needing to manually recreate the
                            document as a PDF.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            What Word files are supported?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current version supports
                            Microsoft Word DOC and DOCX
                            documents. Files are limited to
                            50 MB.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I convert DOCX to PDF?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Upload a DOCX file
                                    and use the Convert to
                                    PDF button to create the
                                    PDF.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I convert DOC to PDF?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. The current backend
                                    supports both DOC and
                                    DOCX Word documents.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Is there a file size
                                    limit?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. The current tool
                                    accepts Word documents up
                                    to 50 MB.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Where does the conversion
                                    happen?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Unlike the browser-only
                                    PDF tools, Word conversion
                                    uses your backend document
                                    conversion service.
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
                        href: "/pdf-to-excel",
                        title: "PDF to Excel",
                        description:
                            "Convert PDF tables into Excel spreadsheets.",
                    },
                    {
                        href: "/merge-pdf",
                        title: "Merge PDF",
                        description:
                            "Combine multiple PDF files into one document.",
                    },
                    {
                        href: "/split-pdf",
                        title: "Split PDF",
                        description:
                            "Split a PDF into separate documents.",
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