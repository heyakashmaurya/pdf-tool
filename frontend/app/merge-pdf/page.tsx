import type { Metadata } from "next";
import MergePdfTool from "@/components/MergePdfTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "Merge PDF Online Free",
    description:
        "Merge multiple PDF files into one document online for free. Combine PDF files directly in your browser without uploading them to a server.",
    path: "/merge-pdf",
    keywords: [
        "merge PDF",
        "merge PDF online",
        "combine PDF files",
        "combine PDF",
        "merge PDF free",
        "PDF merger",
        "combine PDF online",
        "join PDF files",
    ],
});

export default function MergePdfPage() {
    return (
        <>

            <StructuredData
                name="Merge PDF Online"
                description="Combine multiple PDF files into one document directly in your browser."
                path="/merge-pdf"
            />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Merge PDF Files Online
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Combine multiple PDF files into one document. Upload your
                        PDFs, arrange them in the order you want, and download the
                        merged PDF.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <MergePdfTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Merge PDF files online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Our free PDF merger lets you combine multiple PDF
                            documents into a single PDF file. Upload the documents,
                            arrange them in the order you need, and merge them into
                            one file.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to merge PDF files
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your PDFs.</strong> Select two or more
                                PDF files from your device.
                            </li>

                            <li>
                                <strong>2. Arrange the files.</strong> Use the up and
                                down buttons to change their order.
                            </li>

                            <li>
                                <strong>3. Merge the PDFs.</strong> Click the Merge PDF
                                Files button.
                            </li>

                            <li>
                                <strong>4. Download the result.</strong> Your combined
                                PDF will be downloaded to your device.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is the PDF merger free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. This tool is designed to merge supported PDF files
                            without requiring paid PDF software.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Are my PDF files uploaded to a server?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current implementation performs the PDF merging
                            directly in your browser. Your selected PDF files are not
                            sent to a PDF-processing backend by this tool.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I merge multiple PDF files?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Select two or more PDF files and they can be
                                    combined into a single PDF document.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I change the PDF order?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Use the up and down buttons to arrange your
                                    files before merging them.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Is there a PDF upload limit?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    The current version limits each selected PDF to
                                    50 MB. This limit may be adjusted as the tool evolves.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <RelatedTools
                tools={[
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
                        href: "/rotate-pdf",
                        title: "Rotate PDF",
                        description: "Rotate PDF pages and change their orientation.",
                    },
                    {
                        href: "/image-to-pdf",
                        title: "Image to PDF",
                        description: "Convert images into PDF files.",
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