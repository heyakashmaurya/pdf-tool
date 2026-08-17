import type { Metadata } from "next";
import ImageToPdfTool from "@/components/ImageToPdfTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "Image to PDF Converter Online Free",
    description:
        "Convert JPG, PNG, and other supported images to PDF online for free. Create PDF files directly in your browser.",
    path: "/image-to-pdf",
    keywords: [
        "image to PDF",
        "JPG to PDF",
        "PNG to PDF",
        "image to PDF converter",
        "JPG to PDF converter",
        "PNG to PDF converter",
        "convert image to PDF",
        "image PDF converter",
    ],
});


export default function ImageToPdfPage() {
    return (
        <>

            <StructuredData
                name="Image to PDF Converter"
                description="Convert supported images into PDF files directly in your browser."
                path="/image-to-pdf"
            />

            {/* Tool Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Converter
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        JPG to PDF Converter
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Convert JPG and PNG images to PDF online for free. Upload
                        multiple images, arrange them, choose your page settings,
                        and download a single PDF.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <ImageToPdfTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article className="prose max-w-none">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Convert images to PDF online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Our image to PDF converter lets you turn JPG and PNG
                            images into a single PDF document. You can select multiple
                            images, change their order, choose a page size, and create
                            your PDF directly from your browser.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to convert JPG to PDF
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your images.</strong> Select one or
                                more JPG or PNG files.
                            </li>

                            <li>
                                <strong>2. Arrange your images.</strong> Move the images
                                left or right to choose their order.
                            </li>

                            <li>
                                <strong>3. Choose your settings.</strong> Select A4 or
                                Letter page size and portrait or landscape orientation.
                            </li>

                            <li>
                                <strong>4. Create your PDF.</strong> Click the convert
                                button to generate your PDF.
                            </li>

                            <li>
                                <strong>5. Download your PDF.</strong> Your generated
                                PDF will be downloaded to your device.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this image to PDF converter free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. The tool is designed to let you convert supported
                            images to PDF without requiring a paid desktop application.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Are my images uploaded to a server?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            This tool generates the PDF directly in your browser.
                            The current implementation does not send the selected
                            images to a PDF-processing backend.
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
                                    Yes. You can select multiple JPG or PNG images and
                                    combine them into one PDF document.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I change the image order?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Use the move buttons under each uploaded image
                                    to change the page order before generating the PDF.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    What image formats are supported?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    The current version supports JPG and PNG images.
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
                        description: "Combine multiple PDF files into one document.",
                    },
                    {
                        href: "/split-pdf",
                        title: "Split PDF",
                        description: "Split a PDF into separate documents.",
                    },
                    {
                        href: "/rotate-pdf",
                        title: "Rotate PDF",
                        description: "Rotate PDF pages and change their orientation.",
                    },
                    {
                        href: "/watermark-pdf",
                        title: "Watermark PDF",
                        description: "Add a text watermark to a PDF.",
                    },
                    {
                        href: "/add-page-numbers",
                        title: "Add Page Numbers",
                        description: "Add page numbers to your PDF.",
                    },
                ]}
            />
        </>
    );
}