import type { Metadata } from "next";
import SignPdfTool from "@/components/SignPdfTool";
import { createToolMetadata } from "@/lib/seo";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "Sign PDF Online Free",
    description:
        "Sign a PDF online for free. Draw your signature, place it on a PDF page, and download the signed document directly in your browser.",
    path: "/sign-pdf",
    keywords: [
        "sign PDF",
        "sign PDF online",
        "PDF signature",
        "sign PDF online free",
        "add signature to PDF",
        "electronic signature PDF",
        "draw signature on PDF",
        "PDF signer",
    ],
});

export default function SignPdfPage() {
    return (
        <>
            <StructuredData
                name="Sign PDF Online"
                description="Draw a signature and add it to a PDF directly in your browser."
                path="/sign-pdf"
            />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        PDF Tool
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Sign PDF Online
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Draw your signature and add it to a PDF directly
                        in your browser. Choose a page, adjust the
                        signature size, and download your signed PDF.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <SignPdfTool />
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Sign a PDF online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Add a handwritten-style signature to a PDF
                            document directly in your browser. Draw your
                            signature, select the page where it should
                            appear, and create a new signed PDF.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            How to sign a PDF online
                        </h2>

                        <ol className="mt-5 space-y-3 text-base leading-7 text-gray-600">
                            <li>
                                <strong>1. Upload your PDF.</strong>{" "}
                                Select the PDF document you want to sign.
                            </li>

                            <li>
                                <strong>2. Draw your signature.</strong>{" "}
                                Use your mouse, trackpad, or touchscreen
                                to draw your signature.
                            </li>

                            <li>
                                <strong>3. Select the page.</strong>{" "}
                                Choose the PDF page where you want to add
                                the signature.
                            </li>

                            <li>
                                <strong>4. Adjust the size.</strong>{" "}
                                Change the signature size if necessary.
                            </li>

                            <li>
                                <strong>5. Sign and download.</strong>{" "}
                                Create your signed PDF and download it.
                            </li>
                        </ol>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this PDF signature tool free?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Yes. The current tool is designed to let you
                            add a visual signature to a PDF without
                            requiring paid PDF editing software.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Are my PDF files uploaded to a server?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current implementation processes the PDF
                            directly in your browser. The PDF does not
                            need to be uploaded to a PDF-processing
                            backend.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Is this a digital certificate signature?
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            No. This tool adds a visual signature image
                            to the PDF. It does not create a
                            certificate-based cryptographic digital
                            signature.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            Frequently asked questions
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I sign a PDF with my mouse?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. You can draw your signature using
                                    a mouse, trackpad, or compatible
                                    touchscreen.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I choose which PDF page gets my signature?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Select the page where you want the
                                    visual signature to be added.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Can I change the signature size?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Yes. Use the signature size control
                                    before creating the signed PDF.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Is my PDF sent to a server?
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    No. The current version processes the
                                    PDF locally in your browser.
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
                        href: "/watermark-pdf",
                        title: "Watermark PDF",
                        description:
                            "Add a text watermark to a PDF.",
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
                    {
                        href: "/delete-pdf-pages",
                        title: "Delete PDF Pages",
                        description:
                            "Remove unwanted pages from a PDF.",
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