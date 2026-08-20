import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | PDF Tools",
    description:
        "Read the Terms of Service for using our free online PDF tools and services.",
    robots: {
        index: true,
        follow: true,
    },
};

export default function TermsPage() {
    return (
        <main className="bg-white">
            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Legal
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Terms of Service
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Please read these terms before using our online PDF
                        tools and services.
                    </p>

                    <p className="mt-4 text-sm text-gray-500">
                        Last updated: August 20, 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section>
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <article className="prose prose-gray max-w-none">
                        {/* 1 */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900">
                                1. Acceptance of Terms
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                By accessing or using this website and its PDF
                                tools, you agree to be bound by these Terms of
                                Service. If you do not agree with these terms,
                                please do not use the website or its services.
                            </p>
                        </section>

                        {/* 2 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                2. Description of the Service
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Our website provides online tools for working
                                with PDF and other supported document files.
                                These tools may include PDF conversion,
                                compression, merging, splitting, protection,
                                unlocking, OCR, signing, and other document
                                processing features.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Features may be added, changed, suspended, or
                                removed at any time without prior notice.
                            </p>
                        </section>

                        {/* 3 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                3. Use of the Service
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                You agree to use this website only for lawful
                                purposes and in accordance with these Terms of
                                Service.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                You must not use the service to process,
                                distribute, or create content that violates
                                applicable laws or regulations.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                You are responsible for ensuring that you have
                                the necessary rights and permissions to process
                                any files that you upload or otherwise submit
                                to our tools.
                            </p>
                        </section>

                        {/* 4 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                4. Your Files and Content
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                You retain ownership of the files and content
                                that you process using our tools.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                You are responsible for the content of files
                                submitted to the service and for ensuring that
                                your use of those files does not infringe the
                                rights of any third party.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Certain tools may process files directly in
                                your browser, while other tools may require
                                processing by our backend services. Please
                                refer to our Privacy Policy for additional
                                information about file processing and data
                                handling.
                            </p>
                        </section>

                        {/* 5 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                5. No Guarantee of Results
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Although we aim to provide reliable document
                                processing tools, we do not guarantee that every
                                file will be processed successfully or that the
                                resulting document will meet your specific
                                requirements.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                File compatibility, document structure,
                                encryption, fonts, images, formatting, and
                                other technical characteristics may affect the
                                result of a conversion or processing operation.
                            </p>
                        </section>

                        {/* 6 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                6. Availability of the Service
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                We aim to keep the website and its tools
                                available, but we do not guarantee uninterrupted
                                or error-free access.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                The service may occasionally be unavailable due
                                to maintenance, technical problems, updates,
                                hosting issues, network failures, or other
                                circumstances beyond our control.
                            </p>
                        </section>

                        {/* 7 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                7. Prohibited Activities
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                You agree not to misuse the website or attempt
                                to interfere with its operation.
                            </p>

                            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-gray-600">
                                <li>
                                    Attempting to gain unauthorized access to
                                    the website or its systems.
                                </li>

                                <li>
                                    Attempting to disrupt, overload, or damage
                                    the service.
                                </li>

                                <li>
                                    Using automated methods to abuse the
                                    service or bypass reasonable usage
                                    restrictions.
                                </li>

                                <li>
                                    Uploading malicious files, malware, or
                                    content intended to compromise systems.
                                </li>

                                <li>
                                    Using the service for unlawful activities.
                                </li>
                            </ul>
                        </section>

                        {/* 8 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                8. Intellectual Property
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                The website, including its design, branding,
                                interface, code, text, graphics, and other
                                original materials, may be protected by
                                applicable intellectual property laws.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                You may not copy, reproduce, modify, distribute,
                                or commercially exploit protected website
                                materials without appropriate authorization.
                            </p>
                        </section>

                        {/* 9 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                9. Third-Party Services
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Some features may rely on third-party software,
                                libraries, hosting providers, APIs, or other
                                services.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                We are not responsible for interruptions,
                                errors, or changes caused by third-party
                                services.
                            </p>
                        </section>

                        {/* 10 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                10. Disclaimer
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                The website and its tools are provided on an
                                "as is" and "as available" basis to the extent
                                permitted by applicable law.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                We make no guarantee that the service will
                                always be available, accurate, secure,
                                uninterrupted, or suitable for every purpose.
                            </p>
                        </section>

                        {/* 11 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                11. Limitation of Liability
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                To the maximum extent permitted by applicable
                                law, we will not be responsible for indirect,
                                incidental, special, consequential, or other
                                losses resulting from your use of or inability
                                to use the website or its tools.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                You should keep appropriate backups of important
                                files before processing them through any online
                                service.
                            </p>
                        </section>

                        {/* 12 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                12. Changes to These Terms
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                We may update these Terms of Service from time
                                to time. Updated terms will be posted on this
                                page with a revised "Last updated" date.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Your continued use of the website after changes
                                are posted constitutes acceptance of the
                                updated terms to the extent permitted by law.
                            </p>
                        </section>

                        {/* 13 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                13. Termination
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                We may suspend or restrict access to the service
                                if we reasonably believe that a user has
                                violated these terms, misused the service, or
                                created a security or operational risk.
                            </p>
                        </section>

                        {/* 14 */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                14. Contact
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                If you have questions about these Terms of
                                Service, please contact us through the contact
                                page provided on this website.
                            </p>
                        </section>

                        {/* Final */}
                        <section className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Important Notice
                            </h2>

                            <p className="mt-3 text-base leading-7 text-gray-600">
                                These Terms of Service are provided as a general
                                website terms template and may need to be
                                modified to reflect your actual business,
                                jurisdiction, data practices, paid services,
                                and applicable legal requirements.
                            </p>
                        </section>
                    </article>
                </div>
            </section>
        </main>
    );
}