import type { Metadata } from "next";
import DeletePdfPagesTool from "@/components/DeletePdfPagesTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "Delete PDF Pages Online Free",
    description:
        "Delete unwanted pages from a PDF online for free. Select the pages you want to remove and download the updated PDF.",
    path: "/delete-pdf-pages",
    keywords: [
        "delete PDF pages",
        "remove PDF pages",
        "delete pages from PDF",
        "remove pages from PDF",
        "PDF page remover",
        "delete PDF pages online",
        "PDF editor",
    ],
});


export default function DeletePdfPagesPage() {
    return (
        <>
            <StructuredData
                name="Delete PDF Pages"
                description="Remove unwanted pages from PDF files directly in your browser."
                path="/delete-pdf-pages"
            />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Delete PDF Pages Online
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Remove unwanted pages from your PDF and create a new
                        document with only the pages you want to keep.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <DeletePdfPagesTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Delete pages from a PDF online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Remove unwanted pages from PDF documents with this free
                            browser-based PDF page remover. Upload your PDF, select
                            the pages you don't need, and create a new PDF.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to delete pages from a PDF
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your PDF.</strong> Choose the PDF
                                document containing the pages you want to remove.
                            </li>

                            <li>
                                <strong>2. Select unwanted pages.</strong> Click each
                                page you want to delete.
                            </li>

                            <li>
                                <strong>3. Check the remaining pages.</strong> The tool
                                shows how many pages will remain.
                            </li>

                            <li>
                                <strong>4. Create your PDF.</strong> Click Delete
                                Selected Pages.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this PDF page remover free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. You can use the current PDF page removal tool without
                            paid PDF editing software.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Are my PDF files uploaded to a server?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current implementation processes the PDF directly in
                            your browser. The PDF does not need to be uploaded to a
                            PDF-processing backend.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I delete multiple PDF pages?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Select multiple pages and they will all be
                                    removed from the resulting PDF.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I delete the first page?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Select Page 1 and it will be removed from the
                                    generated PDF.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I delete every page?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    No. At least one page must remain in the resulting
                                    PDF.
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
                        href: "/extract-pdf-pages",
                        title: "Extract PDF Pages",
                        description: "Create a new PDF from selected pages.",
                    },
                    {
                        href: "/merge-pdf",
                        title: "Merge PDF",
                        description: "Combine multiple PDF files into one document.",
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
                ]}
            />
        </>
    );
}