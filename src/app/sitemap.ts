import type { MetadataRoute } from "next";
import { fetchBlogsData } from "@/api/blogsService";
import { fetchProductsData } from "@/api/productsService";
import { routing } from "@/i18n/routing";
import { getLocalizedSlug, type LocalizedSlug } from "@/lib/localized-slug";
import {
  buildLanguageAlternates,
  buildSlugLanguageAlternates,
  localeUrl,
} from "@/lib/seo";
import { isApiError } from "@/types/layoutTypes";
import type { BlogsApiResponse } from "@/types/blogTypes";
import type { ProductsApiResponse } from "@/types/productTypes";

const STATIC_PATHS: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products", changeFrequency: "weekly", priority: 0.9 },
  { path: "/categories", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blogs", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/media/images", changeFrequency: "monthly", priority: 0.6 },
  { path: "/media/videos", changeFrequency: "monthly", priority: 0.6 },
  { path: "/sondos-dyeing", changeFrequency: "monthly", priority: 0.8 },
];

function entryForPath(
  locale: string,
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  languages?: Record<string, string>,
): MetadataRoute.Sitemap[number] {
  return {
    url: localeUrl(locale, path),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: languages ?? buildLanguageAlternates(path),
    },
  };
}

function slugEntries(
  collection: "products" | "blogs",
  slug: LocalizedSlug,
  priority: number,
): MetadataRoute.Sitemap {
  const languages = buildSlugLanguageAlternates(collection, slug);
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const localSlug = getLocalizedSlug(slug, locale);
    const raw = slug[locale as keyof LocalizedSlug];
    if (!raw || !localSlug) continue;

    entries.push({
      url: localeUrl(locale, `/${collection}/${localSlug}`),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority,
      alternates: { languages },
    });
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const page of STATIC_PATHS) {
      entries.push(
        entryForPath(locale, page.path, page.changeFrequency, page.priority),
      );
    }
  }

  const [productsRes, blogsRes] = await Promise.all([
    fetchProductsData("en"),
    fetchBlogsData("en"),
  ]);

  if (!isApiError(productsRes)) {
    const products = (productsRes as ProductsApiResponse)?.data ?? [];
    for (const product of products) {
      if (!product?.slug) continue;
      entries.push(...slugEntries("products", product.slug, 0.8));
    }
  }

  if (!isApiError(blogsRes)) {
    const blogs = (blogsRes as BlogsApiResponse)?.data ?? [];
    for (const blog of blogs) {
      if (!blog?.slug) continue;
      entries.push(...slugEntries("blogs", blog.slug, 0.7));
    }
  }

  return entries;
}
