
import Link from "next/link";

export const metadata = {
  title: "Free Online PDF Tools – Merge, Split & Convert PDFs | PDFTools",
  description:
    "Free online PDF tools to merge, split, convert, rotate, and watermark PDF, Word, Excel, and image files. No sign-up or software required.",
  alternates: {
    canonical: "https://pdf.heyakashmaurya.com",
  },
  openGraph: {
    title: "Free Online PDF Tools – Merge, Split & Convert PDFs",
    description:
      "Merge, split, convert, rotate, and manage PDF files online for free. No sign-up or software to install.",
    url: "https://pdf.heyakashmaurya.com",
    siteName: "PDFTools",
    type: "website",
    locale: "en_US",
    // TODO: add a real 1200x630 social image, e.g. images: ["https://pdf.heyakashmaurya.com/og-image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online PDF Tools – Merge, Split & Convert PDFs",
    description:
      "Merge, split, convert, rotate, and manage PDF files online for free. No sign-up or software to install.",
  },
};

const tools = [
  {
    title: "Image to PDF",
    description:
      "Convert JPG, JPEG, PNG, and other images into PDF documents quickly and easily.",
    href: "/image-to-pdf",
    icon: "🖼️",
    category: "convert",
  },
  {
    title: "Word to PDF",
    description:
      "Convert Word documents into PDF files while keeping your documents easy to share.",
    href: "/word-to-pdf",
    icon: "📝",
    category: "convert",
  },
  {
    title: "PDF to Word",
    description:
      "Convert PDF documents into editable Word files for easier editing and reuse.",
    href: "/pdf-to-word",
    icon: "📄",
    category: "convert",
  },
  {
    title: "PDF to Excel",
    description:
      "Convert PDF tables and documents into Excel spreadsheets for easier data handling.",
    href: "/pdf-to-excel",
    icon: "📊",
    category: "convert",
  },
  {
    title: "Merge PDF",
    description:
      "Combine multiple PDF files into a single document without complicated software.",
    href: "/merge-pdf",
    icon: "📑",
    category: "organize",
  },
  {
    title: "Split PDF",
    description:
      "Split PDF documents into individual pages or smaller PDF files.",
    href: "/split-pdf",
    icon: "✂️",
    category: "organize",
  },
  {
    title: "Rotate PDF",
    description:
      "Rotate PDF pages to the correct orientation and download your updated document.",
    href: "/rotate-pdf",
    icon: "🔄",
    category: "organize",
  },
  {
    title: "Delete PDF Pages",
    description:
      "Remove unwanted pages from your PDF and create a cleaner document.",
    href: "/delete-pdf-pages",
    icon: "🗑️",
    category: "organize",
  },
  {
    title: "Extract PDF Pages",
    description:
      "Extract selected pages from a PDF and save them as a new document.",
    href: "/extract-pdf-pages",
    icon: "📤",
    category: "organize",
  },
  {
    title: "Add Page Numbers",
    description:
      "Add page numbers to PDF documents to make reports and documents easier to navigate.",
    href: "/add-page-numbers",
    icon: "🔢",
    category: "edit",
  },
  {
    title: "Watermark PDF",
    description:
      "Add a text watermark to PDF documents for identification and document protection.",
    href: "/watermark-pdf",
    icon: "💧",
    category: "edit",
  },
];

const toolCategories = [
  {
    id: "convert",
    title: "Convert",
    description: "Turn PDFs into other formats, or other formats into PDFs.",
  },
  {
    id: "organize",
    title: "Organize",
    description: "Combine, split, reorder, and clean up PDF pages.",
  },
  {
    id: "edit",
    title: "Edit & Protect",
    description: "Add finishing touches like page numbers and watermarks.",
  },
];

const steps = [
  {
    title: "Pick a tool and upload your file",
    description:
      "Choose the PDF tool you need from the list below, then upload your file from your computer or phone. No account required.",
  },
  {
    title: "We process it in your browser",
    description:
      "Your file is converted, merged, split, or edited right away, with nothing to download and no plugins to install.",
  },
  {
    title: "Download your result",
    description:
      "Once processing is done, download your finished file straight to your device and use another tool anytime.",
  },
];

const useCases = [
  {
    title: "Students & Researchers",
    icon: "🎓",
    description:
      "Merge lecture slides into one study file, pull a single chapter out of a long textbook PDF, or convert a scanned assignment into a clean, shareable document.",
  },
  {
    title: "Professionals & Freelancers",
    icon: "💼",
    description:
      "Turn a Word proposal into a client-ready PDF, watermark a draft before sending it out for review, or combine invoices and reports into one file.",
  },
  {
    title: "Small Businesses & Teams",
    icon: "🏢",
    description:
      "Keep contracts and compliance documents consistent with page numbers, split large archives into department-specific files, and convert forms for easier data entry.",
  },
];

const benefits = [
  {
    icon: "⚡",
    title: "Fast and Simple",
    description:
      "Complete common PDF tasks through straightforward interfaces without complicated software.",
  },
  {
    icon: "🆓",
    title: "Always Free",
    description:
      "Every tool on this site is free to use, with no hidden fees or premium paywalls.",
  },
  {
    icon: "📱",
    title: "Works on Any Device",
    description:
      "Clean, responsive interfaces mean every tool works equally well on desktop, tablet, and mobile.",
  },
];

const privacyPoints = [
  {
    icon: "🔐",
    title: "Used only for your request",
    description:
      "Files you upload are used only to perform the tool action you choose, nothing more.",
  },
  {
    icon: "🙈",
    title: "No account, no personal data",
    description:
      "You don’t need to sign up or share personal details to use any tool on this site.",
  },
  {
    icon: "🌐",
    title: "Encrypted connection",
    description:
      "Uploads and downloads happen over a secure HTTPS connection between your device and our servers.",
  },
  {
    icon: "🗑️",
    title: "Not kept longer than necessary",
    description:
      "Uploaded files are only kept for as long as it takes to complete your request.",
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
    question: "Do I need to create an account to use PDFTools?",
    answer:
      "No. Every tool on PDFTools works without registration, so you can upload a file, run the tool, and download your result right away.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No. All PDFTools utilities run directly in your web browser on desktop, tablet, or mobile, so there is nothing to download or install.",
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
  {
    question: "Can I add page numbers or a watermark to a PDF I already have?",
    answer:
      "Yes. Use the Add Page Numbers tool to number an existing PDF, or the Watermark PDF tool to stamp text across its pages for identification or protection.",
  },
  {
    question: "Is it safe to upload my documents to PDFTools?",
    answer:
      "Your files are used only to perform the operation you request. PDFTools does not require an account or personal information, and uploaded files are not kept longer than necessary to complete your request.",
  },
  {
    question: "Can I use PDFTools on my phone?",
    answer:
      "Yes. PDFTools is built to work on desktop, tablet, and mobile browsers, so you can convert or edit PDFs from any device with an internet connection.",
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
      "@type": "Organization",
      name: "PDFTools",
      url: "https://pdf.heyakashmaurya.com",
      // TODO: add "logo" (a real hosted image URL) and "sameAs" (social profiles) once available
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
      "@type": "HowTo",
      name: "How to use PDFTools",
      step: steps.map((step) => ({
        "@type": "HowToStep",
        name: step.title,
        text: step.description,
      })),
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

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-gray-500">
              <span className="flex items-center gap-2">
                <span aria-hidden="true">✅</span> 100% free to use
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true">🚫</span> No sign-up required
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true">🌐</span> Works in your browser
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-it-works-heading" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="how-it-works-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              How It Works
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
              Three steps, no learning curve.
            </p>
          </div>

          <ol className="mt-12 grid list-none gap-8 p-0 md:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-base font-bold text-white">
                  {index + 1}
                </span>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tools */}
      <section aria-labelledby="pdf-tools-heading" className="bg-gray-50">
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

          <div className="mt-14 space-y-14">
            {toolCategories.map((category) => (
              <div key={category.id}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {category.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {tools
                    .filter((tool) => tool.category === category.id)
                    .map((tool) => (
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

                        <h4 className="mt-5 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                          {tool.title}
                        </h4>

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
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
              >
                <div aria-hidden="true" className="text-3xl">
                  {benefit.icon}
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section aria-labelledby="use-cases-heading" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="use-cases-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Built for How You Work
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
              Whatever the document, there is a faster way to handle it.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div aria-hidden="true" className="text-3xl">
                  {useCase.icon}
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  {useCase.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About PDF Tools */}
      <section aria-labelledby="about-heading" className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Free Online PDF Tools
          </h2>

          <div className="mt-6 space-y-5 text-base leading-7 text-gray-600">
            <p>
              PDF is the format most schools, employers, and government
              offices ask for by default — resumes, contracts, tax forms,
              academic papers, and scanned IDs all tend to end up as PDFs
              sooner or later. It is reliable for reading and printing, but
              not always easy to change once a file is created. Combining two
              PDFs, pulling out a single page, or fixing a sideways scan
              usually means downloading extra software just to make one small
              edit.
            </p>

            <p>
              PDFTools is built to handle those everyday edits without the
              extra software. Each tool on this page focuses on one task —
              merging, splitting, converting, rotating, numbering, or
              watermarking — so you can find what you need and get back to
              work quickly. You can{" "}
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
              , or{" "}
              <Link
                href="/pdf-to-word"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                turn a PDF into an editable Word document
              </Link>
              , all from the same site.
            </p>

            <p>
              Converting between formats is usually the trickiest part, since
              a PDF is a fixed layout rather than editable text. Our PDF to
              Word and PDF to Excel tools do their best to preserve the
              original structure, including paragraphs, tables, and spacing,
              but results can vary depending on how the source PDF was
              created. PDFs exported directly from Word or Google Docs
              generally convert more cleanly than scanned documents or PDFs
              with complex layouts.
            </p>

            <p>
              Every tool runs in the browser, works on desktop and mobile,
              and does not require an account. Pick a tool above, follow the
              instructions on its page, and download your file when it is
              ready.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section
        id="privacy"
        aria-labelledby="privacy-heading"
        className="border-t border-gray-200 bg-gray-50"
      >
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2
              id="privacy-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Your Files Stay Yours
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              A short, plain-language summary of how uploaded files are
              handled.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {privacyPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-gray-200 bg-white p-6"
              >
                <div aria-hidden="true" className="text-2xl">
                  {point.icon}
                </div>

                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {point.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            For sensitive or confidential documents, review our full privacy
            policy before uploading.
          </p>
          {/* TODO: link the sentence above to a real /privacy-policy page once one exists */}
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
              <details key={faq.question} className="group p-6">
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
//       "Convert JPG, JPEG, PNG, and other images into PDF documents quickly and easily.",
//     href: "/image-to-pdf",
//     icon: "🖼️",
//   },
//   {
//     title: "Merge PDF",
//     description:
//       "Combine multiple PDF files into a single document without complicated software.",
//     href: "/merge-pdf",
//     icon: "📑",
//   },
//   {
//     title: "Split PDF",
//     description:
//       "Split PDF documents into individual pages or smaller PDF files.",
//     href: "/split-pdf",
//     icon: "✂️",
//   },
//   {
//     title: "Word to PDF",
//     description:
//       "Convert Word documents into PDF files while keeping your documents easy to share.",
//     href: "/word-to-pdf",
//     icon: "📝",
//   },
//   {
//     title: "PDF to Word",
//     description:
//       "Convert PDF documents into editable Word files for easier editing and reuse.",
//     href: "/pdf-to-word",
//     icon: "📄",
//   },
//   {
//     title: "PDF to Excel",
//     description:
//       "Convert PDF tables and documents into Excel spreadsheets for easier data handling.",
//     href: "/pdf-to-excel",
//     icon: "📊",
//   },
//   {
//     title: "Rotate PDF",
//     description:
//       "Rotate PDF pages to the correct orientation and download your updated document.",
//     href: "/rotate-pdf",
//     icon: "🔄",
//   },
//   {
//     title: "Delete PDF Pages",
//     description:
//       "Remove unwanted pages from your PDF and create a cleaner document.",
//     href: "/delete-pdf-pages",
//     icon: "🗑️",
//   },
//   {
//     title: "Extract PDF Pages",
//     description:
//       "Extract selected pages from a PDF and save them as a new document.",
//     href: "/extract-pdf-pages",
//     icon: "📤",
//   },
//   {
//     title: "Add Page Numbers",
//     description:
//       "Add page numbers to PDF documents to make reports and documents easier to navigate.",
//     href: "/add-page-numbers",
//     icon: "🔢",
//   },
//   {
//     title: "Watermark PDF",
//     description:
//       "Add a text watermark to PDF documents for identification and document protection.",
//     href: "/watermark-pdf",
//     icon: "💧",
//   },
// ];

// const faqs = [
//   {
//     question: "What are PDFTools?",
//     answer:
//       "PDFTools is a collection of online PDF utilities that helps you perform common document tasks such as merging, splitting, rotating, converting, and managing PDF files.",
//   },
//   {
//     question: "Are these PDF tools free to use?",
//     answer:
//       "Yes. PDFTools provides free online PDF utilities for common document processing tasks.",
//   },
//   {
//     question: "Can I merge multiple PDF files?",
//     answer:
//       "Yes. Use the Merge PDF tool to combine multiple PDF documents into a single PDF file.",
//   },
//   {
//     question: "Can I split a PDF into separate pages?",
//     answer:
//       "Yes. The Split PDF tool allows you to separate PDF documents into individual pages or smaller PDF files.",
//   },
//   {
//     question: "Can I convert images to PDF?",
//     answer:
//       "Yes. The Image to PDF tool supports common image formats such as JPG, JPEG, and PNG and converts them into PDF documents.",
//   },
//   {
//     question: "Can I convert PDF files to Word or Excel?",
//     answer:
//       "Yes. PDFTools provides PDF to Word and PDF to Excel tools for supported documents. Conversion results can vary depending on the structure and content of the original PDF.",
//   },
// ];

// const structuredData = {
//   "@context": "https://schema.org",
//   "@graph": [
//     {
//       "@type": "WebSite",
//       name: "PDFTools",
//       url: "https://pdf.heyakashmaurya.com",
//       description:
//         "Free online PDF tools for converting, merging, splitting, rotating, and managing PDF documents.",
//     },
//     {
//       "@type": "WebApplication",
//       name: "PDFTools",
//       url: "https://pdf.heyakashmaurya.com",
//       applicationCategory: "BusinessApplication",
//       operatingSystem: "Web",
//       description:
//         "Free online PDF tools for common document conversion and PDF management tasks.",
//       offers: {
//         "@type": "Offer",
//         price: "0",
//         priceCurrency: "USD",
//       },
//     },
//     {
//       "@type": "FAQPage",
//       mainEntity: faqs.map((faq) => ({
//         "@type": "Question",
//         name: faq.question,
//         acceptedAnswer: {
//           "@type": "Answer",
//           text: faq.answer,
//         },
//       })),
//     },
//   ],
// };

// export default function Home() {
//   return (
//     <>
//       {/* Structured Data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(structuredData),
//         }}
//       />

//       {/* Hero */}
//       <section className="border-b border-gray-200 bg-white">
//         <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28">
//           <div className="mx-auto max-w-4xl">
//             <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
//               Free Online PDF Tools
//             </p>

//             <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
//               Free PDF Tools for Everyday Documents
//             </h1>

//             <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">
//               Merge, split, convert, rotate, and manage your PDF files with
//               simple online PDF tools. No complicated desktop software
//               required.
//             </p>

//             <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
//               <Link
//                 href="/tools"
//                 className="w-full rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
//               >
//                 Explore All PDF Tools
//               </Link>

//               <Link
//                 href="/merge-pdf"
//                 className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
//               >
//                 Merge PDF Online
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Tools */}
//       <section
//         aria-labelledby="pdf-tools-heading"
//         className="bg-gray-50"
//       >
//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
//           <div className="mx-auto max-w-3xl text-center">
//             <h2
//               id="pdf-tools-heading"
//               className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
//             >
//               Online PDF Tools
//             </h2>

//             <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
//               Choose a PDF tool to convert, organize, edit, or manage your
//               documents online.
//             </p>
//           </div>

//           <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {tools.map((tool) => (
//               <Link
//                 key={tool.href}
//                 href={tool.href}
//                 className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 <div
//                   aria-hidden="true"
//                   className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl"
//                 >
//                   {tool.icon}
//                 </div>

//                 <h3 className="mt-5 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
//                   {tool.title}
//                 </h3>

//                 <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
//                   {tool.description}
//                 </p>

//                 <span className="mt-5 text-sm font-semibold text-blue-600">
//                   Use {tool.title} →
//                 </span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Benefits */}
//       <section
//         aria-labelledby="benefits-heading"
//         className="border-y border-gray-200 bg-white"
//       >
//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
//           <div className="mx-auto max-w-3xl text-center">
//             <h2
//               id="benefits-heading"
//               className="text-3xl font-bold tracking-tight text-gray-900"
//             >
//               Simple PDF Processing
//             </h2>

//             <p className="mt-4 text-base leading-7 text-gray-600">
//               PDFTools is designed to make common PDF tasks easier without
//               unnecessary complexity.
//             </p>
//           </div>

//           <div className="mt-12 grid gap-10 md:grid-cols-3">
//             <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
//               <div
//                 aria-hidden="true"
//                 className="text-3xl"
//               >
//                 ⚡
//               </div>

//               <h3 className="mt-5 text-lg font-semibold text-gray-900">
//                 Fast and Simple
//               </h3>

//               <p className="mt-2 text-sm leading-6 text-gray-600">
//                 Complete common PDF tasks through straightforward interfaces
//                 without complicated software.
//               </p>
//             </div>

//             <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
//               <div
//                 aria-hidden="true"
//                 className="text-3xl"
//               >
//                 🔒
//               </div>

//               <h3 className="mt-5 text-lg font-semibold text-gray-900">
//                 Privacy Focused
//               </h3>

//               <p className="mt-2 text-sm leading-6 text-gray-600">
//                 We aim to provide simple document-processing tools with a
//                 privacy-conscious approach to handling uploaded files.
//               </p>
//             </div>

//             <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
//               <div
//                 aria-hidden="true"
//                 className="text-3xl"
//               >
//                 ✨
//               </div>

//               <h3 className="mt-5 text-lg font-semibold text-gray-900">
//                 Easy to Use
//               </h3>

//               <p className="mt-2 text-sm leading-6 text-gray-600">
//                 Clean and responsive interfaces help you complete everyday PDF
//                 tasks on desktop, tablet, and mobile devices.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About PDF Tools */}
//       <section
//         aria-labelledby="about-heading"
//         className="bg-white"
//       >
//         <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
//           <h2
//             id="about-heading"
//             className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
//           >
//             Free Online PDF Tools
//           </h2>

//           <div className="mt-6 space-y-5 text-base leading-7 text-gray-600">
//             <p>
//               PDF documents are widely used for reports, forms, invoices,
//               applications, presentations, and everyday business documents.
//               Working with PDF files can sometimes require simple operations
//               such as combining documents, removing pages, changing page
//               orientation, or converting files into another format.
//             </p>

//             <p>
//               PDFTools provides a collection of online PDF utilities designed
//               for these common tasks. You can{" "}
//               <Link
//                 href="/merge-pdf"
//                 className="font-medium text-blue-600 hover:text-blue-700"
//               >
//                 merge PDF files
//               </Link>
//               ,{" "}
//               <Link
//                 href="/split-pdf"
//                 className="font-medium text-blue-600 hover:text-blue-700"
//               >
//                 split PDF documents
//               </Link>
//               ,{" "}
//               <Link
//                 href="/image-to-pdf"
//                 className="font-medium text-blue-600 hover:text-blue-700"
//               >
//                 convert images to PDF
//               </Link>
//               , rotate pages, remove unwanted pages, and perform other
//               supported PDF operations.
//             </p>

//             <p>
//               Our goal is to provide useful PDF tools with simple interfaces
//               that are easy to understand. Select a tool above and follow the
//               instructions provided on its page.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* FAQ */}
//       <section
//         aria-labelledby="faq-heading"
//         className="border-t border-gray-200 bg-gray-50"
//       >
//         <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
//           <div className="text-center">
//             <h2
//               id="faq-heading"
//               className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
//             >
//               Frequently Asked Questions
//             </h2>

//             <p className="mt-4 text-base leading-7 text-gray-600">
//               Common questions about our online PDF tools.
//             </p>
//           </div>

//           <div className="mt-10 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
//             {faqs.map((faq) => (
//               <details
//                 key={faq.question}
//                 className="group p-6"
//               >
//                 <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-gray-900 marker:hidden">
//                   <span className="flex items-center justify-between gap-4">
//                     {faq.question}

//                     <span
//                       aria-hidden="true"
//                       className="text-xl text-gray-400 transition-transform group-open:rotate-45"
//                     >
//                       +
//                     </span>
//                   </span>
//                 </summary>

//                 <p className="mt-4 text-sm leading-6 text-gray-600">
//                   {faq.answer}
//                 </p>
//               </details>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="bg-blue-600">
//         <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
//           <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
//             Need to work with a PDF?
//           </h2>

//           <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
//             Choose one of our PDF tools and get started with your document.
//           </p>

//           <div className="mt-8">
//             <Link
//               href="/tools"
//               className="inline-flex rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
//             >
//               View All PDF Tools
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
