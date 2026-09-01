

import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://pdf.heyakashmaurya.com";

const lastModified = new Date("2026-09-02");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    {
      path: "/",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      path: "/tools",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/image-to-pdf",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/merge-pdf",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/split-pdf",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/rotate-pdf",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/delete-pdf-pages",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/extract-pdf-pages",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/add-page-numbers",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/watermark-pdf",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/compress-pdf",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/jpg-to-pdf",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/ocr-pdf",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/pdf-to-excel",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/pdf-to-jpg",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/pdf-to-png",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/pdf-to-word",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/privacy",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      path: "/terms",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      path: "/contact",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}




// import type { MetadataRoute } from "next";

// const siteUrl =
//     process.env.NEXT_PUBLIC_SITE_URL || "https://pdf.heyakashmaurya.com";

// export default function sitemap(): MetadataRoute.Sitemap {
//     return [
//         {
//             url: `${siteUrl}/`,
//             lastModified: new Date(),
//             changeFrequency: "weekly",
//             priority: 1,
//         },
//         {
//             url: `${siteUrl}/tools`,
//             lastModified: new Date(),
//             changeFrequency: "weekly",
//             priority: 0.9,
//         },
//         {
//             url: `${siteUrl}/image-to-pdf`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/merge-pdf`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/split-pdf`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/rotate-pdf`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/delete-pdf-pages`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/extract-pdf-pages`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/add-page-numbers`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/watermark-pdf`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/compress-pdf`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/jpg-to-pdf`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/ocr-pdf`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/pdf-to-excel`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/pdf-to-jpg`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/pdf-to-png`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/pdf-to-word`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/privacy`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/terms`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: `${siteUrl}/contact`,
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
        
//     ];
// }