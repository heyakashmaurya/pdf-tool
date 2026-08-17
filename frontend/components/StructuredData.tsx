

type StructuredDataProps = {
    name: string;
    description: string;
    path: string;
};

export default function StructuredData({
    name,
    description,
    path,
}: StructuredDataProps) {
    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://pdf.heyakashmaurya.com";

    const url = `${siteUrl}${path}`;

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "PDF Tools",
        url: siteUrl,
        description:
            "Free online PDF tools for working with PDF files directly in your browser.",
    };

    const applicationSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(applicationSchema),
                }}
            />
        </>
    );
}


// type StructuredDataProps = {
//     name: string;
//     description: string;
//     url: string;
// };

// export default function StructuredData({
//     name,
//     description,
//     url,
// }: StructuredDataProps) {
//     const websiteSchema = {
//         "@context": "https://schema.org",
//         "@type": "WebSite",
//         name: "PDF Tools",
//         url,
//         description:
//             "Free online PDF tools for working with PDF files directly in your browser.",
//     };

//     const applicationSchema = {
//         "@context": "https://schema.org",
//         "@type": "WebApplication",
//         name,
//         description,
//         url,
//         applicationCategory: "UtilitiesApplication",
//         operatingSystem: "Web",
//         browserRequirements: "Requires JavaScript",
//     };

//     return (
//         <>
//             <script
//                 type="application/ld+json"
//                 dangerouslySetInnerHTML={{
//                     __html: JSON.stringify(websiteSchema),
//                 }}
//             />

//             <script
//                 type="application/ld+json"
//                 dangerouslySetInnerHTML={{
//                     __html: JSON.stringify(applicationSchema),
//                 }}
//             />
//         </>
//     );
// }