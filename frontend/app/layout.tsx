import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pdf.heyakashmaurya.com"),

  title: {
    default: "PDFTools - Free Online PDF Tools",
    template: "%s | PDFTools",
  },

  description:
    "Free online PDF tools to merge, split, rotate, convert, and manage PDF files quickly and easily.",

  keywords: [
    "PDF tools",
    "PDF converter",
    "merge PDF",
    "split PDF",
    "image to PDF",
    "PDF editor",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "PDFTools - Free Online PDF Tools",
    description:
      "Free online PDF tools to merge, split, convert, and manage PDF files.",
    type: "website",
    siteName: "PDFTools",
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