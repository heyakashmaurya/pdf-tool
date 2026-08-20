
"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast, Toaster } from "sonner";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { contactSchema } from "@/lib/validations/contact";
import type { ContactFormData } from "@/lib/validations/contact";

// import { FORMSPREE_ENDPOINT } from "@/constants/contact";

export const FORMSPREE_ENDPOINT =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!;

export default function ContactPage() {
    const [sending, setSending] = useState(false);
    // const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setSending(true);

        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("subject", data.subject);
            formData.append("message", data.message);

            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            });

            const json = await response.json();

            if (response.ok) {
                toast.success(
                    "Message sent successfully! We'll get back to you soon."
                );

                reset();
            } else {
                toast.error(
                    json.errors?.[0]?.message ??
                        "Something went wrong. Please try again."
                );
            }
        } catch {
            toast.error(
                "Network error. Please check your connection and try again."
            );
        } finally {
            setSending(false);
        }
    };

    return (
        <main className="bg-white">
            <Toaster position="top-right" richColors />
            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Support
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Contact Us
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                        Have a question, found a problem, or have feedback
                        about our PDF tools? We would love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section>
                <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-3">
                        {/* Contact Information */}
                        <div className="lg:col-span-1">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Get in touch
                            </h2>

                            <p className="mt-4 text-base leading-7 text-gray-600">
                                If you have questions about our tools, need
                                help with a feature, or want to report an
                                issue, you can contact us by email.
                            </p>

                            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl">
                                    ✉️
                                </div>

                                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                                    Email Support
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    For general questions, technical issues,
                                    feedback, and other inquiries.
                                </p>

                                <a
                                    href="mailto:akash45492@gmail.com"
                                    className="mt-4 inline-block break-all font-medium text-blue-600 hover:text-blue-700"
                                >
                                    akash45492@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Send us a message
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Fill out the form below and we will get
                                    back to you as soon as possible.
                                </p>

                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="mt-8 space-y-6"
                                >
                                    {/* Name */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-semibold text-gray-900"
                                        >
                                            Name
                                        </label>

                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Your name"
                                            disabled={sending}
                                            {...register("name")}
                                            className={`mt-2 block w-full rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                                                errors.name
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />

                                        {errors.name?.message && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-semibold text-gray-900"
                                        >
                                            Email
                                        </label>

                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            disabled={sending}
                                            {...register("email")}
                                            className={`mt-2 block w-full rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                                                errors.email
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />

                                        {errors.email?.message && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="block text-sm font-semibold text-gray-900"
                                        >
                                            Subject
                                        </label>

                                        <input
                                            id="subject"
                                            type="text"
                                            placeholder="How can we help?"
                                            disabled={sending}
                                            {...register("subject")}
                                            className={`mt-2 block w-full rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                                                errors.subject
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />

                                        {errors.subject?.message && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.subject.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-semibold text-gray-900"
                                        >
                                            Message
                                        </label>

                                        <textarea
                                            id="message"
                                            rows={7}
                                            placeholder="Tell us how we can help..."
                                            disabled={sending}
                                            {...register("message")}
                                            className={`mt-2 block w-full resize-y rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                                                errors.message
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />

                                        {errors.message?.message && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.message.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={sending}
                                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                        >
                                            {sending ? (
                                                <>
                                                    <LoaderCircle
                                                        size={18}
                                                        className="animate-spin"
                                                    />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <ArrowRight size={18} />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <p className="text-xs leading-5 text-gray-500">
                                        Please do not include passwords,
                                        payment information, or other sensitive
                                        information in your message.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ / Support Information */}
            <section className="border-t border-gray-200 bg-gray-50">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Before contacting us
                    </h2>

                    <div className="mt-8 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Having trouble with a PDF?
                            </h3>

                            <p className="mt-2 text-base leading-7 text-gray-600">
                                Make sure the file is a valid PDF and that it
                                is not corrupted or protected in a way that
                                prevents processing.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Conversion did not work?
                            </h3>

                            <p className="mt-2 text-base leading-7 text-gray-600">
                                Some PDFs contain complex formatting, embedded
                                fonts, scanned pages, or other content that may
                                affect conversion results.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Reporting a bug
                            </h3>

                            <p className="mt-2 text-base leading-7 text-gray-600">
                                When reporting a problem, please tell us which
                                tool you were using, what happened, and what you
                                expected to happen. Avoid sending confidential
                                documents unless necessary.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}




// import type { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "Contact Us | PDF Tools",
//     description:
//         "Contact us for questions, feedback, bug reports, and support regarding our online PDF tools.",
//     robots: {
//         index: true,
//         follow: true,
//     },
// };

// export default function ContactPage() {
//     return (
//         <main className="bg-white">
//             {/* Header */}
//             <section className="border-b border-gray-200 bg-white">
//                 <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
//                     <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
//                         Support
//                     </p>

//                     <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//                         Contact Us
//                     </h1>

//                     <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
//                         Have a question, found a problem, or have feedback
//                         about our PDF tools? We would love to hear from you.
//                     </p>
//                 </div>
//             </section>

//             {/* Contact Content */}
//             <section>
//                 <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
//                     <div className="grid gap-10 lg:grid-cols-3">
//                         {/* Contact Information */}
//                         <div className="lg:col-span-1">
//                             <h2 className="text-2xl font-bold text-gray-900">
//                                 Get in touch
//                             </h2>

//                             <p className="mt-4 text-base leading-7 text-gray-600">
//                                 If you have questions about our tools, need
//                                 help with a feature, or want to report an
//                                 issue, you can contact us by email.
//                             </p>

//                             <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
//                                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl">
//                                     ✉️
//                                 </div>

//                                 <h3 className="mt-5 text-lg font-semibold text-gray-900">
//                                     Email Support
//                                 </h3>

//                                 <p className="mt-2 text-sm leading-6 text-gray-600">
//                                     For general questions, technical issues,
//                                     feedback, and other inquiries.
//                                 </p>

//                                 {/* Replace this email */}
//                                 <a
//                                     href="mailto:akash45492@gmail.com"
//                                     className="mt-4 inline-block break-all font-medium text-blue-600 hover:text-blue-700"
//                                 >
//                                     akash45492@gmail.com
//                                 </a>
//                             </div>
//                         </div>

//                         {/* Contact Form */}
//                         <div className="lg:col-span-2">
//                             <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
//                                 <h2 className="text-2xl font-bold text-gray-900">
//                                     Send us a message
//                                 </h2>

//                                 <p className="mt-2 text-sm leading-6 text-gray-500">
//                                     Fill out the form below and we will get back
//                                     to you as soon as possible.
//                                 </p>

//                                 <form
//                                     action="mailto:akash45492@gmail.com"
//                                     method="post"
//                                     encType="text/plain"
//                                     className="mt-8 space-y-6"
//                                 >
//                                     {/* Name */}
//                                     <div>
//                                         <label
//                                             htmlFor="name"
//                                             className="block text-sm font-semibold text-gray-900"
//                                         >
//                                             Name
//                                         </label>

//                                         <input
//                                             id="name"
//                                             name="Name"
//                                             type="text"
//                                             required
//                                             placeholder="Your name"
//                                             className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                                         />
//                                     </div>

//                                     {/* Email */}
//                                     <div>
//                                         <label
//                                             htmlFor="email"
//                                             className="block text-sm font-semibold text-gray-900"
//                                         >
//                                             Email
//                                         </label>

//                                         <input
//                                             id="email"
//                                             name="Email"
//                                             type="email"
//                                             required
//                                             placeholder="you@example.com"
//                                             className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                                         />
//                                     </div>

//                                     {/* Subject */}
//                                     <div>
//                                         <label
//                                             htmlFor="subject"
//                                             className="block text-sm font-semibold text-gray-900"
//                                         >
//                                             Subject
//                                         </label>

//                                         <input
//                                             id="subject"
//                                             name="Subject"
//                                             type="text"
//                                             required
//                                             placeholder="How can we help?"
//                                             className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                                         />
//                                     </div>

//                                     {/* Message */}
//                                     <div>
//                                         <label
//                                             htmlFor="message"
//                                             className="block text-sm font-semibold text-gray-900"
//                                         >
//                                             Message
//                                         </label>

//                                         <textarea
//                                             id="message"
//                                             name="Message"
//                                             required
//                                             rows={7}
//                                             placeholder="Tell us how we can help..."
//                                             className="mt-2 block w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                                         />
//                                     </div>

//                                     {/* Submit */}
//                                     <div>
//                                         <button
//                                             type="submit"
//                                             className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
//                                         >
//                                             Send Message
//                                         </button>
//                                     </div>

//                                     <p className="text-xs leading-5 text-gray-500">
//                                         Please do not include passwords,
//                                         payment information, or other sensitive
//                                         information in your message.
//                                     </p>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* FAQ / Support Information */}
//             <section className="border-t border-gray-200 bg-gray-50">
//                 <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
//                     <h2 className="text-2xl font-bold text-gray-900">
//                         Before contacting us
//                     </h2>

//                     <div className="mt-8 space-y-6">
//                         <div>
//                             <h3 className="text-lg font-semibold text-gray-900">
//                                 Having trouble with a PDF?
//                             </h3>

//                             <p className="mt-2 text-base leading-7 text-gray-600">
//                                 Make sure the file is a valid PDF and that it
//                                 is not corrupted or protected in a way that
//                                 prevents processing.
//                             </p>
//                         </div>

//                         <div>
//                             <h3 className="text-lg font-semibold text-gray-900">
//                                 Conversion did not work?
//                             </h3>

//                             <p className="mt-2 text-base leading-7 text-gray-600">
//                                 Some PDFs contain complex formatting, embedded
//                                 fonts, scanned pages, or other content that may
//                                 affect conversion results.
//                             </p>
//                         </div>

//                         <div>
//                             <h3 className="text-lg font-semibold text-gray-900">
//                                 Reporting a bug
//                             </h3>

//                             <p className="mt-2 text-base leading-7 text-gray-600">
//                                 When reporting a problem, please tell us which
//                                 tool you were using, what happened, and what
//                                 you expected to happen. Avoid sending
//                                 confidential documents unless necessary.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </main>
//     );
// }