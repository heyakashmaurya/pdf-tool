

import Link from "next/link";

export default function Navbar() {
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-lg font-bold text-gray-900 transition hover:text-blue-600"
                >
                    PDF Tools
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-6 md:flex">
                    <Link
                        href="/tools"
                        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        All Tools
                    </Link>

                    <Link
                        href="/merge-pdf"
                        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        Merge PDF
                    </Link>

                    <Link
                        href="/split-pdf"
                        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        Split PDF
                    </Link>

                    <Link
                        href="/image-to-pdf"
                        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        Image to PDF
                    </Link>
                </nav>
            </div>
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