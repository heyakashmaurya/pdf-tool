import type { Metadata } from "next";
import ExtractPdfPagesTool from "@/components/ExtractPdfPagesTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "Extract PDF Pages Online Free",
    description:
        "Extract selected pages from a PDF online for free. Choose the pages you need and create a new PDF directly in your browser.",
    path: "/extract-pdf-pages",
    keywords: [
        "extract PDF pages",
        "extract pages from PDF",
        "PDF page extractor",
        "extract PDF online",
        "extract PDF pages free",
        "save selected PDF pages",
        "save PDF pages",
        "PDF splitter",
    ],
});

// export const metadata: Metadata = {
//     title: "Extract PDF Pages Online Free",
//     description:
//         "Extract pages from a PDF online for free. Select the pages you need and create a new PDF directly in your browser.",
//     keywords: [
//         "extract PDF pages",
//         "extract pages from PDF",
//         "PDF page extractor",
//         "extract PDF online",
//         "save PDF pages",
//         "PDF splitter",
//     ],
//     alternates: {
//         canonical: "/extract-pdf-pages",
//     },
//     openGraph: {
//         title: "Extract PDF Pages Online Free",
//         description:
//             "Select specific pages from a PDF and create a new PDF directly in your browser.",
//         type: "website",
//     },
// };

export default function ExtractPdfPagesPage() {
    return (
        <>

            <StructuredData
                name="Extract PDF Pages"
                description="Extract selected pages from a PDF and create a new PDF directly in your browser."
                path="/extract-pdf-pages"
            />
            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Extract PDF Pages Online
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Select specific pages from a PDF and create a new PDF
                        containing only the pages you need.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <ExtractPdfPagesTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Extract pages from a PDF
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Use this free PDF page extractor to select specific pages
                            from an existing PDF and save them as a separate PDF
                            document.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to extract pages from a PDF
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your PDF.</strong> Select the PDF
                                document containing the pages you need.
                            </li>

                            <li>
                                <strong>2. Select pages.</strong> Click the pages you
                                want to extract.
                            </li>

                            <li>
                                <strong>3. Extract the pages.</strong> Click Extract
                                Selected Pages.
                            </li>

                            <li>
                                <strong>4. Download the new PDF.</strong> A new PDF
                                containing only your selected pages will be downloaded.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this PDF extractor free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. The current PDF page extraction tool is free to
                            use and processes the document directly in your browser.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Are my PDF files uploaded?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            No PDF-processing backend is required for this version.
                            The PDF is processed locally in your browser.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I extract multiple pages?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. You can select multiple pages and save them
                                    together as one new PDF.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I extract just one page?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Select a single page and the generated PDF will
                                    contain only that page.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Will the page order be preserved?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Selected pages are placed into the new PDF in
                                    their original page order.
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
                        href: "/add-page-numbers",
                        title: "Add Page Numbers",
                        description: "Add page numbers to your PDF.",
                    },
                ]}
            />
        </>
    );
}