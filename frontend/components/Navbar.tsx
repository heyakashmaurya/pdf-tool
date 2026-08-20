

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const mainLinks = [
  {
    label: "All Tools",
    href: "/tools",
  },
  {
    label: "Merge PDF",
    href: "/merge-pdf",
  },
  {
    label: "Split PDF",
    href: "/split-pdf",
  },
  {
    label: "Image to PDF",
    href: "/image-to-pdf",
  },
];

const moreTools = [
  {
    label: "Word to PDF",
    href: "/word-to-pdf",
  },
  {
    label: "PDF to Word",
    href: "/pdf-to-word",
  },
  {
    label: "PDF to Excel",
    href: "/pdf-to-excel",
  },
  {
    label: "Rotate PDF",
    href: "/rotate-pdf",
  },
  {
    label: "Delete PDF Pages",
    href: "/delete-pdf-pages",
  },
  {
    label: "Extract PDF Pages",
    href: "/extract-pdf-pages",
  },
  {
    label: "Add Page Numbers",
    href: "/add-page-numbers",
  },
  {
    label: "Watermark PDF",
    href: "/watermark-pdf",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Prevent background scrolling while mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMoreOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          aria-label="PDFTools home"
          className="shrink-0 text-lg font-bold tracking-tight text-gray-900 transition hover:text-blue-600"
        >
          PDFTools
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {link.label}
            </Link>
          ))}

          {/* More Tools */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((current) => !current)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              More Tools
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {moreOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
              >
                {moreTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact */}
          <Link
            href="/contact"
            className="ml-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-gray-200 bg-white md:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-7xl px-4 py-4 sm:px-6"
          >
            <div className="space-y-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile More Tools */}
            <div className="mt-3 border-t border-gray-100 pt-3">
              <button
                type="button"
                onClick={() => setMoreOpen((current) => !current)}
                aria-expanded={moreOpen}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                More PDF Tools

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {moreOpen && (
                <div className="mt-1 space-y-1 pl-2">
                  {moreTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={closeMobileMenu}
                      className="block rounded-lg px-4 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-blue-600"
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Contact */}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// import Link from "next/link";

// export default function Navbar() {
//     return (
//         <header className="border-b border-gray-200 bg-white">
//             <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//                 {/* Logo */}
//                 <Link
//                     href="/"
//                     className="text-lg font-bold text-gray-900 transition hover:text-blue-600"
//                 >
//                     PDF Tools
//                 </Link>

//                 {/* Desktop Navigation */}
//                 <nav className="hidden items-center gap-6 md:flex">
//                     <Link
//                         href="/tools"
//                         className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
//                     >
//                         All Tools
//                     </Link>

//                     <Link
//                         href="/merge-pdf"
//                         className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
//                     >
//                         Merge PDF
//                     </Link>

//                     <Link
//                         href="/split-pdf"
//                         className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
//                     >
//                         Split PDF
//                     </Link>

//                     <Link
//                         href="/image-to-pdf"
//                         className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
//                     >
//                         Image to PDF
//                     </Link>
//                 </nav>
//             </div>
//         </header>
//     );
// }


// import Link from "next/link";

// export default function Navbar() {
//     return (
//         <header className="border-b border-gray-200 bg-white">
//             <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//                 {/* Logo */}
//                 <Link
//                     href="/tools"
//                     className="transition hover:text-blue-600"
//                 >
//                     Tools
//                 </Link>

//                 {/* Desktop Navigation */}
//                 <nav className="hidden items-center gap-6 md:flex">
//                     <Link
//                         href="/merge-pdf"
//                         className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
//                     >
//                         Merge PDF
//                     </Link>

//                     <Link
//                         href="/split-pdf"
//                         className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
//                     >
//                         Split PDF
//                     </Link>

//                     <Link
//                         href="/image-to-pdf"
//                         className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
//                     >
//                         Image to PDF
//                     </Link>
//                 </nav>
//             </div>
//         </header>
//     );
// }