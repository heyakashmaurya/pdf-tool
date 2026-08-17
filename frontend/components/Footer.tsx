import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-lg font-bold text-gray-900"
            >
              PDFTools
            </Link>

            <p className="mt-2 text-sm text-gray-500">
              Simple and useful online PDF tools.
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 transition hover:text-gray-900"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-gray-500 transition hover:text-gray-900"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="text-sm text-gray-500 transition hover:text-gray-900"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} PDFTools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}