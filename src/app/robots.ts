import type { MetadataRoute } from "next";
import { getSiteUrl, isProductionSite } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const isProd = isProductionSite();

  if (!isProd) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/resources/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
