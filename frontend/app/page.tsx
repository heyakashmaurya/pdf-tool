

import Link from "next/link";

const tools = [
  {
    title: "Image to PDF",
    description:
      "Convert JPG, JPEG, PNG, and other images into PDF documents quickly and easily.",
    href: "/image-to-pdf",
    icon: "🖼️",
  },
  {
    title: "Merge PDF",
    description:
      "Combine multiple PDF files into a single document without complicated software.",
    href: "/merge-pdf",
    icon: "📑",
  },
  {
    title: "Split PDF",
    description:
      "Split PDF documents into individual pages or smaller PDF files.",
    href: "/split-pdf",
    icon: "✂️",
  },
  {
    title: "Word to PDF",
    description:
      "Convert Word documents into PDF files while keeping your documents easy to share.",
    href: "/word-to-pdf",
    icon: "📝",
  },
  {
    title: "PDF to Word",
    description:
      "Convert PDF documents into editable Word files for easier editing and reuse.",
    href: "/pdf-to-word",
    icon: "📄",
  },
  {
    title: "PDF to Excel",
    description:
      "Convert PDF tables and documents into Excel spreadsheets for easier data handling.",
    href: "/pdf-to-excel",
    icon: "📊",
  },
  {
    title: "Rotate PDF",
    description:
      "Rotate PDF pages to the correct orientation and download your updated document.",
    href: "/rotate-pdf",
    icon: "🔄",
  },
  {
    title: "Delete PDF Pages",
    description:
      "Remove unwanted pages from your PDF and create a cleaner document.",
    href: "/delete-pdf-pages",
    icon: "🗑️",
  },
  {
    title: "Extract PDF Pages",
    description:
      "Extract selected pages from a PDF and save them as a new document.",
    href: "/extract-pdf-pages",
    icon: "📤",
  },
  {
    title: "Add Page Numbers",
    description:
      "Add page numbers to PDF documents to make reports and documents easier to navigate.",
    href: "/add-page-numbers",
    icon: "🔢",
  },
  {
    title: "Watermark PDF",
    description:
      "Add a text watermark to PDF documents for identification and document protection.",
    href: "/watermark-pdf",
    icon: "💧",
  },
];

const faqs = [
  {
    question: "What are PDFTools?",
    answer:
      "PDFTools is a collection of online PDF utilities that helps you perform common document tasks such as merging, splitting, rotating, converting, and managing PDF files.",
  },
  {
    question: "Are these PDF tools free to use?",
    answer:
      "Yes. PDFTools provides free online PDF utilities for common document processing tasks.",
  },
  {
    question: "Can I merge multiple PDF files?",
    answer:
      "Yes. Use the Merge PDF tool to combine multiple PDF documents into a single PDF file.",
  },
  {
    question: "Can I split a PDF into separate pages?",
    answer:
      "Yes. The Split PDF tool allows you to separate PDF documents into individual pages or smaller PDF files.",
  },
  {
    question: "Can I convert images to PDF?",
    answer:
      "Yes. The Image to PDF tool supports common image formats such as JPG, JPEG, and PNG and converts them into PDF documents.",
  },
  {
    question: "Can I convert PDF files to Word or Excel?",
    answer:
      "Yes. PDFTools provides PDF to Word and PDF to Excel tools for supported documents. Conversion results can vary depending on the structure and content of the original PDF.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "PDFTools",
      url: "https://pdf.heyakashmaurya.com",
      description:
        "Free online PDF tools for converting, merging, splitting, rotating, and managing PDF documents.",
    },
    {
      "@type": "WebApplication",
      name: "PDFTools",
      url: "https://pdf.heyakashmaurya.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Free online PDF tools for common document conversion and PDF management tasks.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Free Online PDF Tools
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Free PDF Tools for Everyday Documents
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">
              Merge, split, convert, rotate, and manage your PDF files with
              simple online PDF tools. No complicated desktop software
              required.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="w-full rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
              >
                Explore All PDF Tools
              </Link>

              <Link
                href="/merge-pdf"
                className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
              >
                Merge PDF Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section
        aria-labelledby="pdf-tools-heading"
        className="bg-gray-50"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="pdf-tools-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Online PDF Tools
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
              Choose a PDF tool to convert, organize, edit, or manage your
              documents online.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl"
                >
                  {tool.icon}
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {tool.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
                  {tool.description}
                </p>

                <span className="mt-5 text-sm font-semibold text-blue-600">
                  Use {tool.title} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        aria-labelledby="benefits-heading"
        className="border-y border-gray-200 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="benefits-heading"
              className="text-3xl font-bold tracking-tight text-gray-900"
            >
              Simple PDF Processing
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              PDFTools is designed to make common PDF tasks easier without
              unnecessary complexity.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div
                aria-hidden="true"
                className="text-3xl"
              >
                ⚡
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Fast and Simple
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Complete common PDF tasks through straightforward interfaces
                without complicated software.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div
                aria-hidden="true"
                className="text-3xl"
              >
                🔒
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Privacy Focused
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                We aim to provide simple document-processing tools with a
                privacy-conscious approach to handling uploaded files.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div
                aria-hidden="true"
                className="text-3xl"
              >
                ✨
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Easy to Use
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Clean and responsive interfaces help you complete everyday PDF
                tasks on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About PDF Tools */}
      <section
        aria-labelledby="about-heading"
        className="bg-white"
      >
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Free Online PDF Tools
          </h2>

          <div className="mt-6 space-y-5 text-base leading-7 text-gray-600">
            <p>
              PDF documents are widely used for reports, forms, invoices,
              applications, presentations, and everyday business documents.
              Working with PDF files can sometimes require simple operations
              such as combining documents, removing pages, changing page
              orientation, or converting files into another format.
            </p>

            <p>
              PDFTools provides a collection of online PDF utilities designed
              for these common tasks. You can{" "}
              <Link
                href="/merge-pdf"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                merge PDF files
              </Link>
              ,{" "}
              <Link
                href="/split-pdf"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                split PDF documents
              </Link>
              ,{" "}
              <Link
                href="/image-to-pdf"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                convert images to PDF
              </Link>
              , rotate pages, remove unwanted pages, and perform other
              supported PDF operations.
            </p>

            <p>
              Our goal is to provide useful PDF tools with simple interfaces
              that are easy to understand. Select a tool above and follow the
              instructions provided on its page.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="border-t border-gray-200 bg-gray-50"
      >
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2
              id="faq-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              Common questions about our online PDF tools.
            </p>
          </div>

          <div className="mt-10 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group p-6"
              >
                <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-gray-900 marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}

                    <span
                      aria-hidden="true"
                      className="text-xl text-gray-400 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Need to work with a PDF?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
            Choose one of our PDF tools and get started with your document.
          </p>

          <div className="mt-8">
            <Link
              href="/tools"
              className="inline-flex rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              View All PDF Tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}



// import Link from "next/link";

// const tools = [
//   {
//     title: "Image to PDF",
//     description:
//       "Convert JPG, PNG, and other images into PDF files directly in your browser.",
//     href: "/image-to-pdf",
//   },
//   {
//     title: "Merge PDF",
//     description:
//       "Combine multiple PDF files into one document quickly and easily.",
//     href: "/merge-pdf",
//   },
//   {
//     title: "Split PDF",
//     description:
//       "Split a PDF into separate pages or smaller PDF documents.",
//     href: "/split-pdf",
//   },
//   {
//     title: "Word to PDF",
//     description:
//       "Make Words into Pdf pages or smaller PDF documents.",
//     href: "/word-to-pdf",
//   },
//   {
//     title: "Rotate PDF",
//     description:
//       "Rotate PDF pages and download the updated document.",
//     href: "/rotate-pdf",
//   },
//   {
//     title: "Delete PDF Pages",
//     description:
//       "Remove unwanted pages from your PDF document.",
//     href: "/delete-pdf-pages",
//   },
//   {
//     title: "Extract PDF Pages",
//     description:
//       "Extract selected pages from an existing PDF file.",
//     href: "/extract-pdf-pages",
//   },
//   {
//     title: "Add Page Numbers",
//     description:
//       "Add page numbers to your PDF documents.",
//     href: "/add-page-numbers",
//   },
//   {
//     title: "Watermark PDF",
//     description:
//       "Add a text watermark to your PDF files.",
//     href: "/watermark-pdf",
//   },
// ];

// export default function Home() {
//   return (
//     <>
//       {/* Hero */}
//       <section className="bg-white">
//         <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
//           <div className="mx-auto max-w-3xl">
//             <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
//               Free Online PDF Tools
//             </p>

//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
//               Simple PDF tools for everyday work
//             </h1>

//             <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
//               Merge, split, rotate, convert, and manage your PDF files with
//               simple online tools.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Tools */}
//       <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//         <div className="mb-10">
//           <h2 className="text-3xl font-bold tracking-tight text-gray-900">
//             PDF Tools
//           </h2>

//           <p className="mt-2 text-gray-600">
//             Choose a tool to get started.
//           </p>
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {tools.map((tool) => (
//             <Link
//               key={tool.href}
//               href={tool.href}
//               className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
//             >
//               <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl">
//                 📄
//               </div>

//               <h3 className="text-lg font-semibold text-gray-900">
//                 {tool.title}
//               </h3>

//               <p className="mt-2 text-sm leading-6 text-gray-600">
//                 {tool.description}
//               </p>

//               <span className="mt-5 inline-block text-sm font-medium text-blue-600">
//                 Open tool →
//               </span>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Benefits */}
//       <section className="border-y border-gray-200 bg-white">
//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//           <div className="grid gap-10 md:grid-cols-3">
//             <div>
//               <div className="mb-4 text-3xl">⚡</div>

//               <h2 className="text-lg font-semibold text-gray-900">
//                 Fast
//               </h2>

//               <p className="mt-2 text-sm leading-6 text-gray-600">
//                 Process supported PDF tasks quickly without complicated
//                 software.
//               </p>
//             </div>

//             <div>
//               <div className="mb-4 text-3xl">🔒</div>

//               <h2 className="text-lg font-semibold text-gray-900">
//                 Privacy focused
//               </h2>

//               <p className="mt-2 text-sm leading-6 text-gray-600">
//                 Browser-based tools can process supported files directly on
//                 your device.
//               </p>
//             </div>

//             <div>
//               <div className="mb-4 text-3xl">✨</div>

//               <h2 className="text-lg font-semibold text-gray-900">
//                 Easy to use
//               </h2>

//               <p className="mt-2 text-sm leading-6 text-gray-600">
//                 Simple interfaces designed to help you complete common PDF
//                 tasks quickly.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SEO Content */}
//       <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold tracking-tight text-gray-900">
//           Free PDF tools online
//         </h2>

//         <div className="mt-6 space-y-5 text-base leading-7 text-gray-600">
//           <p>
//             PDFTools provides simple online tools for working with PDF
//             documents. You can merge PDF files, split documents, rotate pages,
//             convert images to PDF, and perform other common PDF tasks.
//           </p>

//           <p>
//             Our browser-based tools are designed to make common document
//             operations simple and accessible without requiring desktop PDF
//             software.
//           </p>

//           <p>
//             Choose a PDF tool above to get started. We are continuously
//             expanding the collection with additional document and PDF
//             utilities.
//           </p>
//         </div>
//       </section>
//     </>
//   );
// }