import type { Metadata } from "next";
import AddPageNumbersTool from "@/components/AddPageNumbersTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "Add Page Numbers to PDF Online Free",
    description:
        "Add page numbers to PDF files online for free. Customize the page number position and create your numbered PDF directly in your browser.",
    path: "/add-page-numbers",
    keywords: [
        "add page numbers to PDF",
        "PDF page numbers",
        "number PDF pages",
        "add page numbers PDF online",
        "PDF page numbering",
        "number PDF online",
        "number pages in PDF",
    ],
});

// export const metadata: Metadata = {
//   title: "Add Page Numbers to PDF Online Free",
//   description:
//     "Add page numbers to PDF files online for free. Choose the position and starting number, then download your numbered PDF.",
//   keywords: [
//     "add page numbers to PDF",
//     "number PDF pages",
//     "PDF page numbers",
//     "add page numbers online",
//     "number pages in PDF",
//   ],
//   alternates: {
//     canonical: "/add-page-numbers",
//   },
//   openGraph: {
//     title: "Add Page Numbers to PDF Online Free",
//     description:
//       "Add page numbers to your PDF directly in your browser.",
//     type: "website",
//   },
// };

export default function AddPageNumbersPage() {
    return (
        <>
            <StructuredData
                name="Add Page Numbers to PDF"
                description="Add page numbers to PDF files directly in your browser."
                path="/add-page-numbers"
            />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Add Page Numbers to PDF
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Add page numbers to every page of your PDF. Choose the
                        position and starting number before downloading your
                        numbered document.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <AddPageNumbersTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Add page numbers to PDF online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Use this free PDF page numbering tool to add page
                            numbers to your document. You can choose from several
                            positions and set the starting number before creating
                            your new PDF.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to add page numbers to a PDF
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your PDF.</strong> Select the PDF
                                document you want to number.
                            </li>

                            <li>
                                <strong>2. Choose a position.</strong> Select top-left,
                                top-center, top-right, bottom-left, bottom-center, or
                                bottom-right.
                            </li>

                            <li>
                                <strong>3. Choose the starting number.</strong> For
                                example, start at 1 or 5.
                            </li>

                            <li>
                                <strong>4. Add the numbers.</strong> Click Add Page
                                Numbers to create your new PDF.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this PDF page numbering tool free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. You can add page numbers without using paid PDF
                            editing software.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Are my PDF files uploaded?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current implementation processes the PDF directly
                            inside your browser, so a PDF-processing backend is not
                            required.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I choose where the page numbers appear?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. You can place the page numbers in the top or
                                    bottom left, center, or right of each page.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I start numbering from another number?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Enter any whole number greater than or equal to
                                    1 as the starting number.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Does the tool modify my original PDF?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    No. The original file remains unchanged. The tool
                                    creates and downloads a new numbered PDF.
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
                        href: "/watermark-pdf",
                        title: "Watermark PDF",
                        description: "Add a text watermark to a PDF.",
                    },
                ]}
            />
        </>
    );
}