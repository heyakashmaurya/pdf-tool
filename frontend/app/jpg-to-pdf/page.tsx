import type { Metadata } from "next";
import JpgToPdfTool from "@/components/JpgToPdfTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "JPG to PDF Converter Online Free",
    description:
        "Convert JPG images to PDF online for free. Combine multiple JPG images into one PDF directly in your browser without uploading your files.",
    path: "/jpg-to-pdf",
    keywords: [
        "JPG to PDF",
        "JPG to PDF converter",
        "convert JPG to PDF",
        "JPG to PDF online",
        "JPG to PDF free",
        "JPEG to PDF",
        "images to PDF",
        "photo to PDF",
    ],
});

export default function JpgToPdfPage() {
    return (
        <>
            <StructuredData
                name="JPG to PDF Converter"
                description="Convert JPG images into a PDF directly in your browser."
                path="/jpg-to-pdf"
            />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        JPG to PDF Converter
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Convert JPG images to PDF online for free.
                        Combine multiple images into one PDF directly
                        in your browser.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <JpgToPdfTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Convert JPG to PDF online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Convert JPG and JPEG images into a PDF
                            document directly in your browser. You can
                            select multiple images and combine them into
                            a single PDF file.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to convert JPG to PDF
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Add your JPG images.</strong>{" "}
                                Select one or multiple JPG files.
                            </li>

                            <li>
                                <strong>2. Review your images.</strong>{" "}
                                Check the images that will be included
                                in the PDF.
                            </li>

                            <li>
                                <strong>3. Remove unwanted images.</strong>{" "}
                                Remove any image you do not want in the
                                final document.
                            </li>

                            <li>
                                <strong>4. Create your PDF.</strong>{" "}
                                Click Convert JPG to PDF.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this JPG to PDF converter free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. The current JPG to PDF converter is
                            available to use without paid PDF software.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Are my JPG files uploaded?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current implementation processes the
                            images directly in your browser. Your images
                            do not need to be uploaded to a
                            PDF-processing backend.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I convert multiple JPG images to one PDF?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Select multiple JPG images and
                                    they will be added as separate pages
                                    in the resulting PDF.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I remove an image before creating the PDF?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Remove unwanted images before
                                    creating the final PDF.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Does the tool require a backend?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    No. The current implementation creates
                                    the PDF directly in your browser.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    What image formats are supported?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    This version supports JPG and JPEG
                                    images.
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
                        href: "/image-to-pdf",
                        title: "Image to PDF",
                        description:
                            "Convert supported image files into PDF documents.",
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