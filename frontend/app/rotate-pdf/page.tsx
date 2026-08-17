import type { Metadata } from "next";
import RotatePdfTool from "@/components/RotatePdfTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "Rotate PDF Online Free",
    description:
        "Rotate PDF pages online for free. Change the orientation of your PDF pages directly in your browser and download the result.",
    path: "/rotate-pdf",
    keywords: [
        "rotate PDF",
        "rotate PDF online",
        "rotate PDF pages",
        "rotate PDF free",
        "PDF rotator",
        "turn PDF pages",
        "change PDF orientation",
    ],
});


export default function RotatePdfPage() {
    return (
        <>

            <StructuredData
                name="Rotate PDF Online"
                description="Rotate PDF pages and change their orientation directly in your browser."
                path="/rotate-pdf"
            />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Rotate PDF Online
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Rotate every page in your PDF by 90, 180, or 270 degrees
                        and download the updated document.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <RotatePdfTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Rotate PDF files online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Use this free PDF rotator to change the orientation of
                            every page in a PDF document. Choose 90, 180, or 270
                            degrees and create a new PDF directly in your browser.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to rotate a PDF
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your PDF.</strong> Select the document
                                you want to rotate.
                            </li>

                            <li>
                                <strong>2. Choose the rotation.</strong> Select 90°,
                                180°, or 270°.
                            </li>

                            <li>
                                <strong>3. Rotate the PDF.</strong> Click the Rotate PDF
                                button.
                            </li>

                            <li>
                                <strong>4. Download the result.</strong> Your rotated
                                PDF will be downloaded to your device.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this PDF rotator free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. The current version provides basic PDF rotation
                            without requiring paid PDF editing software.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Are my PDF files uploaded?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current implementation processes the PDF directly in
                            your browser. The document is not sent to a
                            PDF-processing backend.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I rotate all PDF pages?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. The current version rotates every page in the
                                    uploaded PDF.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I rotate a PDF by 90 degrees?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. You can rotate the document by 90 degrees
                                    clockwise.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I rotate a PDF by 180 degrees?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Select the 180° option before creating the
                                    rotated PDF.
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
                        href: "/delete-pdf-pages",
                        title: "Delete PDF Pages",
                        description: "Remove unwanted pages from a PDF.",
                    },
                    {
                        href: "/extract-pdf-pages",
                        title: "Extract PDF Pages",
                        description: "Create a new PDF from selected pages.",
                    },
                    {
                        href: "/watermark-pdf",
                        title: "Watermark PDF",
                        description: "Add a text watermark to a PDF.",
                    },
                ]}
            />
        </>
    );
}