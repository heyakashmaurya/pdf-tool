import type { Metadata } from "next";
import CompressPdfTool from "@/components/CompressPdfTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "Compress PDF to Target Size Online Free",
    description:
        "Compress PDF files online and choose a target file size such as 500 KB or 1 MB. Reduce PDF size directly in your browser for free.",
    path: "/compress-pdf",
    keywords: [
        "compress PDF",
        "compress PDF to 1MB",
        "compress PDF to KB",
        "compress PDF to MB",
        "compress PDF to 500KB",
        "compress PDF to 400KB",
        "compress PDF to 300KB",
        "compress PDF to 200KB",
        "compress PDF to 100KB",
        "compress PDF to 50KB",
        "compress PDF to 40KB",
        "compress PDF to target size",
        "compress PDF online",
        "compress PDF free",
        "reduce PDF size",
        "reduce PDF file size",
        "PDF compressor",
        "PDF size reducer",
    ],
});

export default function CompressPdfPage() {
    return (
        <>
            <StructuredData
                name="Compress PDF"
                description="Compress PDF files to a selected target size directly in your browser."
                path="/compress-pdf"
            />

            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Compress PDF to Target Size
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Reduce your PDF to a selected target size,
                        such as 500 KB or 1 MB, directly in your browser.
                    </p>
                </div>
            </section>

            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <CompressPdfTool />
            </main>

            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Compress a PDF to a target size
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Need to reduce a 3 MB PDF to around 500 KB?
                            Enter your desired target size and the tool
                            will try different compression levels to
                            produce a smaller PDF.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to compress a PDF to 500 KB
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your PDF.</strong>{" "}
                                Select the PDF you want to compress.
                            </li>

                            <li>
                                <strong>2. Enter the target size.</strong>{" "}
                                For example, enter 500 and select KB.
                            </li>

                            <li>
                                <strong>3. Start compression.</strong>{" "}
                                Click the compression button.
                            </li>

                            <li>
                                <strong>4. Download the result.</strong>{" "}
                                The tool downloads the smallest suitable
                                result it can produce.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Can I compress a 3 MB PDF to 500 KB?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The tool will try to reach the selected
                            target size. Whether a particular PDF can
                            reach 500 KB depends on its pages, images,
                            resolution, and content. The tool reports
                            the actual resulting file size instead of
                            falsely claiming an exact size.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Are my PDF files uploaded?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            No. This version processes the PDF directly
                            in your browser and does not require a
                            PDF-processing backend.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I select a target size in KB?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. You can enter a target size and
                                    select KB.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I select a target size in MB?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. You can switch the target unit
                                    between KB and MB.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Will the result always be exactly 500 KB?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    No. PDF compression depends on the
                                    document content. The tool tries to
                                    reach the target and reports the
                                    actual resulting size.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Is the compression performed in my browser?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. The current version performs
                                    the conversion locally in the
                                    browser.
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
                        href: "/rotate-pdf",
                        title: "Rotate PDF",
                        description:
                            "Rotate PDF pages and change their orientation.",
                    },
                ]}
            />
        </>
    );
}