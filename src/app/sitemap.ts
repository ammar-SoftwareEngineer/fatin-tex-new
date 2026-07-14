import type { MetadataRoute } from "next";
import { fetchBlogsData } from "@/api/blogsService";
import { fetchProductsData } from "@/api/productsService";
import { routing } from "@/i18n/routing";
import { getLocalizedSlug } from "@/lib/localized-slug";
import { localeUrl } from "@/lib/seo/site";
import { isApiError } from "@/types/layoutTypes";
import type { Blog, BlogsApiResponse } from "@/types/blogTypes";
import type { Product, ProductsApiResponse } from "@/types/productTypes";

const STATIC_PATHS = [
  "",
  "/about",
  "/blogs",
  "/products",
  "/categories",
  "/contact",
  "/media/images",
  "/media/videos",
  "/sondos-dyeing",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: localeUrl(locale, path),
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }

  const [blogsRes, productsRes] = await Promise.all([
    fetchBlogsData(routing.defaultLocale),
    fetchProductsData(routing.defaultLocale),
  ]);

  const blogs: Blog[] = isApiError(blogsRes)
    ? []
    : ((blogsRes as BlogsApiResponse).data ?? []);

  const products: Product[] = isApiError(productsRes)
    ? []
    : ((productsRes as ProductsApiResponse).data ?? []);

  for (const blog of blogs) {
    for (const locale of routing.locales) {
      const slug = getLocalizedSlug(blog.slug, locale);
      const hasLocaleSlug = Boolean(
        blog.slug?.[locale as keyof typeof blog.slug],
      );
      if (!slug || !hasLocaleSlug) continue;

      entries.push({
        url: localeUrl(locale, `/blogs/${slug}`),
        lastModified: blog.published_at
          ? new Date(blog.published_at)
          : now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  for (const product of products) {
    for (const locale of routing.locales) {
      const slug = getLocalizedSlug(product.slug, locale);
      const hasLocaleSlug = Boolean(
        product.slug?.[locale as keyof typeof product.slug],
      );
      if (!slug || !hasLocaleSlug) continue;

      entries.push({
        url: localeUrl(locale, `/products/${slug}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
