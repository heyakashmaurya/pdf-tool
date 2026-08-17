import type { Metadata } from "next";
import SplitPdfTool from "@/components/SplitPdfTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "Split PDF Online Free",
    description:
        "Split PDF files online for free. Separate a PDF into multiple documents directly in your browser.",
    path: "/split-pdf",
    keywords: [
        "split PDF",
        "split PDF online",
        "split PDF free",
        "PDF splitter",
        "extract PDF pages",
        "separate PDF pages",
        "split PDF file",
    ],
});


export default function SplitPdfPage() {
    return (
        <>

            <StructuredData
                name="Split PDF Online"
                description="Split PDF files into separate documents directly in your browser."
                path="/split-pdf"
            />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Split PDF Online
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Select the pages you need from a PDF and create a new
                        PDF document directly in your browser.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <SplitPdfTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Split PDF files online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Use our free PDF splitter to select specific pages from
                            an existing PDF and create a new document. Select one or
                            more pages and download the resulting PDF.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to split a PDF
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your PDF.</strong> Choose the PDF
                                document you want to split.
                            </li>

                            <li>
                                <strong>2. Select pages.</strong> Click the pages you
                                want to keep in the new PDF.
                            </li>

                            <li>
                                <strong>3. Create the PDF.</strong> Click the Create
                                Split PDF button.
                            </li>

                            <li>
                                <strong>4. Download the result.</strong> The selected
                                pages will be saved as a new PDF file.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this PDF splitter free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. The current tool is designed to provide basic PDF
                            page splitting without requiring paid PDF software.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Are my PDF files uploaded?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current implementation processes the PDF directly in
                            your browser and does not send the selected document to a
                            PDF-processing backend.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I select multiple pages?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. You can select any combination of pages and
                                    create a new PDF containing those pages.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I select all pages?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Use the Select all button to select every page
                                    in the uploaded PDF.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I deselect pages?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Click any selected page to remove it from the
                                    selection.
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
                        href: "/extract-pdf-pages",
                        title: "Extract PDF Pages",
                        description: "Create a new PDF from selected pages.",
                    },
                    {
                        href: "/delete-pdf-pages",
                        title: "Delete PDF Pages",
                        description: "Remove unwanted pages from a PDF.",
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
                        href: "/add-page-numbers",
                        title: "Add Page Numbers",
                        description: "Add page numbers to your PDF.",
                    },
                ]}
            />
        </>
    );
}