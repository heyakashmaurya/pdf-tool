import type { Metadata } from "next";
import PdfToJpgTool from "@/components/PdfToJpgTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "PDF to JPG Converter Online Free",
    description:
        "Convert PDF pages to JPG images online for free. Turn every PDF page into a JPG directly in your browser without uploading your PDF.",
    path: "/pdf-to-jpg",
    keywords: [
        "PDF to JPG",
        "PDF to JPG converter",
        "convert PDF to JPG",
        "PDF to JPG online",
        "PDF to JPG free",
        "PDF pages to JPG",
        "PDF to JPEG",
        "convert PDF pages to images",
    ],
});

export default function PdfToJpgPage() {
    return (
        <>
            <StructuredData
                name="PDF to JPG Converter"
                description="Convert PDF pages into JPG images directly in your browser."
                path="/pdf-to-jpg"
            />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        PDF to JPG Converter
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Convert PDF pages into JPG images online for
                        free. Your PDF is processed directly in your
                        browser.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <PdfToJpgTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Convert PDF to JPG online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Convert PDF pages into JPG images directly
                            in your browser. Each page of your PDF is
                            rendered as a separate JPG image that you
                            can save to your device.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to convert PDF to JPG
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your PDF.</strong>{" "}
                                Choose the PDF you want to convert.
                            </li>

                            <li>
                                <strong>2. Check the PDF.</strong>{" "}
                                The tool displays the number of pages
                                in your document.
                            </li>

                            <li>
                                <strong>3. Convert the PDF.</strong>{" "}
                                Click Convert PDF to JPG.
                            </li>

                            <li>
                                <strong>4. Download the images.</strong>{" "}
                                Each PDF page is generated as a separate
                                JPG file.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this PDF to JPG converter free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. You can use the current PDF to JPG
                            converter without paid PDF conversion
                            software.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Are my PDF files uploaded?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current implementation processes the
                            PDF directly in your browser. Your PDF does
                            not need to be uploaded to a
                            PDF-processing backend.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Does each PDF page become a separate JPG?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Each page is converted into
                                    its own JPG image.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I convert a multi-page PDF?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. The tool processes every page
                                    in the uploaded PDF.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Does the PDF need to be uploaded to a server?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    No. The current version performs
                                    the conversion in your browser.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    What is the maximum PDF size?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    The current tool accepts PDF files
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
                        href: "/pdf-to-png",
                        title: "PDF to PNG",
                        description:
                            "Convert PDF pages into PNG images.",
                    },
                    {
                        href: "/jpg-to-pdf",
                        title: "JPG to PDF",
                        description:
                            "Convert JPG images into a PDF document.",
                    },
                    {
                        href: "/image-to-pdf",
                        title: "Image to PDF",
                        description:
                            "Convert images into PDF documents.",
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
                ]}
            />
        </>
    );
}