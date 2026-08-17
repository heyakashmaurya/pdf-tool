import Link from "next/link";

type Tool = {
    href: string;
    title: string;
    description: string;
};

type RelatedToolsProps = {
    tools: Tool[];
};

export default function RelatedTools({
    tools,
}: RelatedToolsProps) {
    return (
        <section className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Related PDF Tools
                </h2>

                <p className="mt-2 text-gray-600">
                    Try these other free PDF tools in your browser.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className="rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                        >
                            <h3 className="font-semibold text-gray-900">
                                {tool.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                {tool.description}
                            </p>

                            <span className="mt-4 inline-block text-sm font-medium text-blue-600">
                                Use tool →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}