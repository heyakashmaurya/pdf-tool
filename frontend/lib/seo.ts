
import type { Metadata } from "next";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

export type ToolSEO = {
    title: string;
    description: string;
    path: string;
    keywords: string[];
};

export function createToolMetadata({
    title,
    description,
    path,
    keywords,
}: ToolSEO): Metadata {
    const url = `${siteUrl}${path}`;

    return {
        title,
        description,
        keywords,

        alternates: {
            canonical: path,
        },

        openGraph: {
            title,
            description,
            url,
            siteName: "PDF Tools",
            type: "website",
            images: [
                {
                    url: `${siteUrl}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${siteUrl}/opengraph-image`],
        },

        robots: {
            index: true,
            follow: true,
        },
    };
}



// import type { Metadata } from "next";

// const siteUrl =
//     process.env.NEXT_PUBLIC_SITE_URL ||
//     "http://pdf.heyakashmaurya.com";

// export type ToolSEO = {
//     title: string;
//     description: string;
//     path: string;
//     keywords: string[];
// };

// export function createToolMetadata({
//     title,
//     description,
//     path,
//     keywords,
// }: ToolSEO): Metadata {
//     const url = `${siteUrl}${path}`;

//     return {
//         title,
//         description,

//         keywords,

//         alternates: {
//             canonical: path,
//         },

//         openGraph: {
//             title,
//             description,
//             url,
//             siteName: "PDF Tools",
//             type: "website",
//         },

//         twitter: {
//             card: "summary",
//             title,
//             description,
//         },

//         robots: {
//             index: true,
//             follow: true,
//         },
//     };
// }