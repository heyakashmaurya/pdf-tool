
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";

const SITE_URL = "https://pdf.heyakashmaurya.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "PDFTools – Free Online PDF Tools & PDF Converter",
    template: "%s | PDFTools",
  },

  description:
    "Free online PDF tools to merge, split, rotate, convert, compress, edit, and manage PDF files. Fast, simple, and easy-to-use PDF tools for everyday documents.",

  applicationName: "PDFTools",

  generator: "Next.js",

  keywords: [
    "PDF tools",
    "free PDF tools",
    "online PDF tools",
    "PDF converter",
    "online PDF converter",
    "merge PDF",
    "merge PDF online",
    "split PDF",
    "split PDF online",
    "rotate PDF",
    "rotate PDF online",
    "image to PDF",
    "JPG to PDF",
    "PNG to PDF",
    "Word to PDF",
    "PDF to Word",
    "PDF to Excel",
    "PDF editor",
    "PDF page remover",
    "delete PDF pages",
    "extract PDF pages",
    "add page numbers to PDF",
    "watermark PDF",
    "free online PDF converter",
  ],

  authors: [
    {
      name: "PDFTools",
      url: SITE_URL,
    },
  ],

  creator: "PDFTools",

  publisher: "PDFTools",

  category: "technology",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,

    siteName: "PDFTools",

    title: "PDFTools – Free Online PDF Tools & PDF Converter",

    description:
      "Use free online PDF tools to merge, split, rotate, convert, edit, and manage your PDF documents quickly and easily.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PDFTools – Free Online PDF Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "PDFTools – Free Online PDF Tools & PDF Converter",

    description:
      "Free online PDF tools for merging, splitting, rotating, converting, and managing PDF documents.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}




// import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import "./globals.css";

// export const metadata: Metadata = {
//   metadataBase: new URL("https://pdf.heyakashmaurya.com"),

//   alternates: {
//             canonical: "https://pdf.heyakashmaurya.com",
//         },



//   title: {
//     default: "PDFTools - Free Online PDF Tools",
//     template: "%s | PDFTools",
//   },

//   description:
//     "Free online PDF tools to merge, split, rotate, convert, and manage PDF files quickly and easily.",

//   keywords: [
//     "PDF tools",
//     "PDF converter",
//     "merge PDF",
//     "split PDF",
//     "image to PDF",
//     "PDF editor",
//   ],

//   robots: {
//     index: true,
//     follow: true,
//   },

//   openGraph: {
//     title: "PDFTools - Free Online PDF Tools",
//     description:
//       "Free online PDF tools to merge, split, convert, and manage PDF files.",
//     type: "website",
//     siteName: "PDFTools",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
//         <div className="flex min-h-screen flex-col">
//           <Navbar />

//           <main className="flex-1">{children}</main>

//           <Footer />
//         </div>
//       </body>
//     </html>
//   );
// }