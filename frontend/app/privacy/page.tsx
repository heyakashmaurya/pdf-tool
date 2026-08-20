import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
    title: "Privacy Policy | PDF Tool",
    description:
        "Read the privacy policy for PDF Tool and learn how your files and personal information are handled.",
    robots: {
        index: true,
        follow: true,
    },
};

export default function PrivacyPage() {
    return (
        <main className="bg-white">

            <StructuredData
                name="PDF to Word Converter"
                description="Convert PDF files to editable Word documents online."
                path="/privacy"
            />

            {/* Header */}
            <section className="border-b border-gray-200">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Legal
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Privacy Policy
                    </h1>

                    <p className="mt-5 text-base leading-7 text-gray-600">
                        Your privacy is important to us. This Privacy Policy
                        explains how PDF Tool handles information when you use
                        our website and PDF tools.
                    </p>

                    <p className="mt-3 text-sm text-gray-500">
                        Last updated: August 20, 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section>
                <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                    <article className="prose prose-gray max-w-none">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900">
                                1. Introduction
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                PDF Tool provides online tools for working with
                                PDF and document files. We are committed to
                                protecting your privacy and being transparent
                                about how information is handled when you use
                                our website.
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                2. Information We Collect
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Depending on how you use the website, we may
                                process the following types of information:
                            </p>

                            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-gray-600">
                                <li>
                                    Files that you choose to upload to our
                                    document-processing tools.
                                </li>

                                <li>
                                    Information you voluntarily provide when
                                    contacting us.
                                </li>

                                <li>
                                    Basic technical information such as browser
                                    type, device information, IP address, and
                                    general usage information where required
                                    for security, analytics, or website
                                    operation.
                                </li>
                            </ul>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                3. How We Process Your Files
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Some PDF tools may process files directly in
                                your browser, while other tools may send files
                                to our backend processing service so that the
                                requested conversion or operation can be
                                completed.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Files sent to our processing servers are used
                                to perform the requested operation and are not
                                intended to be used for unrelated purposes.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                You should not upload files containing
                                confidential, sensitive, or highly personal
                                information unless you are comfortable using
                                the relevant processing service.
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                4. Information We Do Not Sell
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                We do not sell your uploaded documents or
                                personal information to third parties.
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                5. Cookies and Analytics
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Our website may use cookies or similar
                                technologies for essential website functions,
                                analytics, security, and improving the user
                                experience.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                If third-party analytics, advertising, or other
                                services are enabled on the website, those
                                services may collect information according to
                                their own privacy policies.
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                6. Data Security
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                We take reasonable technical and organizational
                                measures to protect information processed
                                through the website. However, no internet
                                transmission or electronic storage system can
                                be guaranteed to be completely secure.
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                7. Third-Party Services
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Our website may use third-party services for
                                hosting, analytics, infrastructure, security,
                                payments, advertising, or document processing.
                                These services may process limited information
                                necessary to provide their functionality.
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                8. Children's Privacy
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                PDF Tool is not intended to knowingly collect
                                personal information from children. If you
                                believe that a child has provided personal
                                information through our website, please contact
                                us so that we can review the situation.
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                9. Your Choices
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                You can choose whether to use our tools and
                                whether to provide information through our
                                contact channels. You should avoid uploading
                                documents that you do not have permission to
                                process.
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                10. Changes to This Privacy Policy
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                We may update this Privacy Policy from time to
                                time to reflect changes to our services,
                                technology, or legal requirements. The updated
                                version will be published on this page with a
                                revised date.
                            </p>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900">
                                11. Contact Us
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                If you have questions about this Privacy Policy
                                or how your information is handled, please
                                contact us through our contact page.
                            </p>

                            <p className="mt-4">
                                <a
                                    href="/contact"
                                    className="font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Contact PDF Tool →
                                </a>
                            </p>
                        </section>
                    </article>
                </div>
            </section>
        </main>
    );
}