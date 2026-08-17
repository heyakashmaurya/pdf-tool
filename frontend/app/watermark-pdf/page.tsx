import type { Metadata } from "next";
import WatermarkPdfTool from "@/components/WatermarkPdfTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "Watermark PDF Online Free",
    description:
        "Add a text watermark to PDF files online for free. Customize the watermark position, size, opacity, and rotation directly in your browser.",
    path: "/watermark-pdf",
    keywords: [
        "watermark PDF",
        "watermark PDF online",
        "add watermark to PDF",
        "PDF watermark tool",
        "watermark PDF free",
        "add text watermark PDF",
    ],
});

export default function WatermarkPdfPage() {
    return (
        <>
            <StructuredData
                name="Watermark PDF Online"
                description="Add a text watermark to PDF files directly in your browser."
                path="/watermark-pdf"
            />

            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Watermark PDF Online
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Add a text watermark to your PDF. Customize its position,
                        size, opacity, and rotation before downloading your
                        watermarked document.
                    </p>
                </div>
            </section>

            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <WatermarkPdfTool />
            </main>

            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Add a watermark to a PDF online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Add a text watermark to PDF documents directly in your
                            browser. You can customize the watermark position,
                            font size, opacity, and rotation.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to watermark a PDF
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your PDF.</strong> Select the document
                                you want to watermark.
                            </li>

                            <li>
                                <strong>2. Enter your watermark.</strong> For example,
                                use "CONFIDENTIAL" or your company name.
                            </li>

                            <li>
                                <strong>3. Customize the watermark.</strong> Choose its
                                position, size, opacity, and rotation.
                            </li>

                            <li>
                                <strong>4. Create the PDF.</strong> Click Add Watermark
                                to generate your new PDF.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this PDF watermark tool free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. This tool is designed to let you add a text
                            watermark to a PDF without requiring paid PDF editing
                            software.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Are my PDF files uploaded?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current version processes the PDF directly in your
                            browser. A PDF-processing backend is not required.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I change the watermark position?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. You can place the watermark at the top, center,
                                    or bottom of the page, with left, center, and right
                                    alignment options.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I make the watermark transparent?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Reduce the opacity value to make the watermark
                                    less visible.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I rotate the watermark?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. You can use a positive or negative rotation
                                    angle.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <RelatedTools
                tools={[
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
                        href: "/delete-pdf-pages",
                        title: "Delete PDF Pages",
                        description:
                            "Remove unwanted pages from a PDF.",
                    },
                    {
                        href: "/extract-pdf-pages",
                        title: "Extract PDF Pages",
                        description:
                            "Create a new PDF from selected pages.",
                    },
                    {
                        href: "/rotate-pdf",
                        title: "Rotate PDF",
                        description:
                            "Rotate PDF pages and change their orientation.",
                    },
                    {
                        href: "/image-to-pdf",
                        title: "Image to PDF",
                        description:
                            "Convert images into PDF files directly in your browser.",
                    },
                ]}
            />
        </>
    );
}