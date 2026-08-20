import type { Metadata } from "next";

import OcrPdfTool from "@/components/OcrPdfTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "OCR PDF Online Free - Make Scanned PDFs Searchable",
    description:
        "Convert scanned PDF documents into searchable PDFs with free online OCR. Recognize text from scanned PDF pages and create a searchable document.",
    path: "/ocr-pdf",
    keywords: [
        "OCR PDF",
        "OCR PDF online",
        "PDF OCR",
        "convert scanned PDF to searchable PDF",
        "make PDF searchable",
        "extract text from scanned PDF",
        "scanned PDF OCR",
        "searchable PDF",
        "PDF text recognition",
    ],
});

export default function OcrPdfPage() {
    return (
        <>
            <StructuredData
                name="OCR PDF"
                description="Convert scanned PDF documents into searchable PDFs using OCR."
                path="/ocr-pdf"
            />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        OCR PDF Online
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Convert scanned PDF documents into searchable
                        PDFs with OCR. Recognize text from scanned pages
                        and make your documents easier to search and
                        copy.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <OcrPdfTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            OCR PDF online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            OCR, or optical character recognition, can
                            recognize text contained inside scanned PDF
                            pages. This OCR PDF tool processes your
                            document and creates a searchable PDF.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            What is OCR?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Optical character recognition converts text
                            visible in scanned documents or images into
                            machine-readable text. This allows you to
                            search for words, select text, and copy
                            recognized content from scanned documents.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to OCR a PDF
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your PDF.</strong>{" "}
                                Select the scanned PDF you want to process.
                            </li>

                            <li>
                                <strong>2. Start OCR.</strong> Click the
                                OCR PDF button to send the document to the
                                OCR processing service.
                            </li>

                            <li>
                                <strong>3. Wait for processing.</strong>{" "}
                                The system converts PDF pages into images
                                and recognizes the text.
                            </li>

                            <li>
                                <strong>4. Download your PDF.</strong>{" "}
                                Your processed searchable PDF will be
                                downloaded automatically.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            What can I do with an OCR PDF?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            A searchable PDF makes it easier to find
                            words and phrases, select recognized text,
                            copy text into other applications, and work
                            with scanned documents.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Can OCR recognize scanned documents?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. OCR is specifically useful for scanned
                            documents where the visible text is stored as
                            an image rather than as normal selectable PDF
                            text.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this OCR PDF tool free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current version of the tool is available
                            for free use with supported PDF files.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can OCR make a scanned PDF searchable?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. OCR can recognize text from scanned
                                    pages and create a searchable document.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I copy text from an OCR PDF?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    When text is successfully recognized,
                                    the resulting searchable PDF can allow
                                    the recognized text to be selected and
                                    copied.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Does OCR work with image-based PDFs?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. OCR is particularly useful for
                                    image-based and scanned PDF documents.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    How large can my PDF be?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    The current frontend accepts PDF files
                                    up to 50 MB.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Related Tools */}
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
                            "Extract PDF tables and convert them into Excel files.",
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
                            "Reduce PDF file size while keeping the document usable.",
                    },
                ]}
            />
        </>
    );
}