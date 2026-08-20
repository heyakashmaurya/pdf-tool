import Link from "next/link";
import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = createToolMetadata({
    title: "Free Online PDF Tools",
    description:
        "Use free online PDF tools to merge, split, rotate, convert, extract, watermark, and edit PDF files directly in your browser.",
    path: "/tools",
    keywords: [
        "PDF tools",
        "free PDF tools",
        "online PDF tools",
        "PDF editor",
        "PDF converter",
        "PDF tools online",
    ],
});
// export const metadata: Metadata = {
//   title: "Free PDF Tools Online",
//   description:
//     "Use free online PDF tools to merge, split, rotate, extract, delete, watermark, number, and convert PDF files directly in your browser.",
//   keywords: [
//     "PDF tools",
//     "free PDF tools",
//     "online PDF tools",
//     "PDF editor",
//     "PDF converter",
//     "PDF tools online",
//   ],
//   alternates: {
//     canonical: "/tools",
//   },
//   openGraph: {
//     title: "Free PDF Tools Online",
//     description:
//       "Free browser-based PDF tools for merging, splitting, rotating, extracting, watermarking, and more.",
//     type: "website",
//   },
// };

type Tool = {
    title: string;
    description: string;
    href: string;
    icon: string;
};

const tools: Tool[] = [
    {
        title: "Image to PDF",
        description:
            "Convert JPG, PNG, and other images into a PDF document.",
        href: "/image-to-pdf",
        icon: "🖼️",
    },
    {
        title: "JPG to PDF",
        description:
            "Convert JPG images into a professional PDF document.",
        href: "/jpg-to-pdf",
        icon: "📷",
    },
    {
        title: "PDF to JPG",
        description:
            "Convert PDF pages into high-quality JPG images.",
        href: "/pdf-to-jpg",
        icon: "📸",
    },
    {
        title: "PDF to PNG",
        description:
            "Convert PDF pages into high-quality PNG images.",
        href: "/pdf-to-png",
        icon: "🖼️",
    },
    {
        title: "PDF to Word",
        description:
            "Convert PDF files into editable Word documents.",
        href: "/pdf-to-word",
        icon: "📝",
    },
    {
        title: "Word to PDF",
        description:
            "Convert Word documents into professional PDF files.",
        href: "/word-to-pdf",
        icon: "📄",
    },
    {
        title: "PDF to Excel",
        description:
            "Convert PDF tables and data into editable Excel spreadsheets.",
        href: "/pdf-to-excel",
        icon: "📊",
    },
    {
        title: "OCR PDF",
        description:
            "Make scanned PDFs searchable and extract text using OCR.",
        href: "/ocr-pdf",
        icon: "🔍",
    },
    {
        title: "Merge PDF",
        description:
            "Combine multiple PDF files into a single PDF document.",
        href: "/merge-pdf",
        icon: "🔗",
    },
    {
        title: "Split PDF",
        description:
            "Split a PDF into separate documents quickly and easily.",
        href: "/split-pdf",
        icon: "✂️",
    },
    {
        title: "Compress PDF",
        description:
            "Reduce PDF file size while keeping the document readable.",
        href: "/compress-pdf",
        icon: "🗜️",
    },
    {
        title: "Extract PDF Pages",
        description:
            "Select specific pages from a PDF and create a new PDF.",
        href: "/extract-pdf-pages",
        icon: "📑",
    },
    {
        title: "Delete PDF Pages",
        description:
            "Remove unwanted pages from a PDF document.",
        href: "/delete-pdf-pages",
        icon: "🗑️",
    },
    {
        title: "Rotate PDF",
        description:
            "Rotate PDF pages and download the updated document.",
        href: "/rotate-pdf",
        icon: "🔄",
    },
    {
        title: "Add Page Numbers",
        description:
            "Add page numbers to your PDF with customizable positioning.",
        href: "/add-page-numbers",
        icon: "🔢",
    },
    {
        title: "Watermark PDF",
        description:
            "Add a text watermark to your PDF with customizable settings.",
        href: "/watermark-pdf",
        icon: "💧",
    },
    {
        title: "Sign PDF",
        description:
            "Add your signature to a PDF document quickly and easily.",
        href: "/sign-pdf",
        icon: "✍️",
    },
];
export default function ToolsPage() {
    return (
        <>

            <StructuredData
                name="Free Online PDF Tools"
                description="Free online tools for working with PDF files directly in your browser."
                path="/tools"
            />

            {/* Hero */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Free Online PDF Tools
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        All PDF Tools
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Use our free online PDF tools to convert, merge, split,
                        rotate, extract, delete, watermark, and manage PDF files
                        directly in your browser.
                    </p>
                </div>
            </section>

            {/* Tools */}
            <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                                {tool.icon}
                            </div>

                            <h2 className="mt-5 text-xl font-semibold text-gray-900 transition group-hover:text-blue-600">
                                {tool.title}
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                {tool.description}
                            </p>

                            <div className="mt-5 text-sm font-semibold text-blue-600">
                                Use this tool →
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            {/* SEO Content */}
            <section className="border-t border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Free PDF tools online
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            Our collection of free PDF tools helps you work with PDF
                            documents directly from your web browser. You can merge
                            PDF files, split documents, extract pages, delete pages,
                            rotate pages, add page numbers, create watermarks, and
                            convert images to PDF.
                        </p>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            These tools are designed to be simple and easy to use.
                            Choose a tool above, upload your document, select the
                            options you need, and download the resulting PDF.
                        </p>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            What can you do with our PDF tools?
                        </h2>

                        <div className="mt-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Merge PDF files
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Combine multiple PDF documents into a single file.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Split and extract PDF pages
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Separate PDF documents or select individual pages
                                    to create a new PDF.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Edit PDF pages
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Delete unwanted pages, rotate pages, or add page
                                    numbers to your documents.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Add PDF watermarks
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Add a customizable text watermark to your PDF
                                    documents.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Convert images to PDF
                                </h3>

                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Convert supported image files into PDF documents
                                    directly in your browser.
                                </p>
                            </div>
                        </div>

                        <h2 className="mt-12 text-2xl font-bold text-gray-900">
                            PDF tools that work in your browser
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-600">
                            The current tools are designed to process supported
                            files directly in the browser. This means you can use
                            the tools without setting up a PDF-processing server for
                            these operations.
                        </p>
                    </article>
                </div>
            </section>
        </>
    );
}