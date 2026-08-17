import Link from "next/link";

const tools = [
  {
    title: "Image to PDF",
    description:
      "Convert JPG, PNG, and other images into PDF files directly in your browser.",
    href: "/image-to-pdf",
  },
  {
    title: "Merge PDF",
    description:
      "Combine multiple PDF files into one document quickly and easily.",
    href: "/merge-pdf",
  },
  {
    title: "Split PDF",
    description:
      "Split a PDF into separate pages or smaller PDF documents.",
    href: "/split-pdf",
  },
  {
    title: "Rotate PDF",
    description:
      "Rotate PDF pages and download the updated document.",
    href: "/rotate-pdf",
  },
  {
    title: "Delete PDF Pages",
    description:
      "Remove unwanted pages from your PDF document.",
    href: "/delete-pdf-pages",
  },
  {
    title: "Extract PDF Pages",
    description:
      "Extract selected pages from an existing PDF file.",
    href: "/extract-pdf-pages",
  },
  {
    title: "Add Page Numbers",
    description:
      "Add page numbers to your PDF documents.",
    href: "/add-page-numbers",
  },
  {
    title: "Watermark PDF",
    description:
      "Add a text watermark to your PDF files.",
    href: "/watermark-pdf",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Free Online PDF Tools
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Simple PDF tools for everyday work
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Merge, split, rotate, convert, and manage your PDF files with
              simple online tools.
            </p>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            PDF Tools
          </h2>

          <p className="mt-2 text-gray-600">
            Choose a tool to get started.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl">
                📄
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {tool.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {tool.description}
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-blue-600">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="mb-4 text-3xl">⚡</div>

              <h2 className="text-lg font-semibold text-gray-900">
                Fast
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Process supported PDF tasks quickly without complicated
                software.
              </p>
            </div>

            <div>
              <div className="mb-4 text-3xl">🔒</div>

              <h2 className="text-lg font-semibold text-gray-900">
                Privacy focused
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Browser-based tools can process supported files directly on
                your device.
              </p>
            </div>

            <div>
              <div className="mb-4 text-3xl">✨</div>

              <h2 className="text-lg font-semibold text-gray-900">
                Easy to use
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Simple interfaces designed to help you complete common PDF
                tasks quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Free PDF tools online
        </h2>

        <div className="mt-6 space-y-5 text-base leading-7 text-gray-600">
          <p>
            PDFTools provides simple online tools for working with PDF
            documents. You can merge PDF files, split documents, rotate pages,
            convert images to PDF, and perform other common PDF tasks.
          </p>

          <p>
            Our browser-based tools are designed to make common document
            operations simple and accessible without requiring desktop PDF
            software.
          </p>

          <p>
            Choose a PDF tool above to get started. We are continuously
            expanding the collection with additional document and PDF
            utilities.
          </p>
        </div>
      </section>
    </>
  );
}