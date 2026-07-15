import type { MetadataRoute } from "next";
import { fetchBlogsData } from "@/api/blogsService";
import { fetchProductsData } from "@/api/productsService";
import { routing } from "@/i18n/routing";
import { getLocalizedSlug } from "@/lib/localized-slug";
import { localeUrl } from "@/lib/seo";
import { isApiError } from "@/types/layoutTypes";
import type { BlogsApiResponse } from "@/types/blogTypes";
import type { ProductsApiResponse } from "@/types/productTypes";


const PAGES = [
  "",
  "/about",
  "/products",
  "/categories",
  "/blogs",
  "/contact",
  "/media/images",
  "/media/videos",
  "/sondos-dyeing",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // 1) الصفحات الثابتة بكل لغة
  for (const locale of routing.locales) {
    for (const path of PAGES) {
      entries.push({
        url: localeUrl(locale, path),
        lastModified: now,
      });
    }
  }

  // 2) صفحات المنتجات والمقالات من الـ API
  const [productsRes, blogsRes] = await Promise.all([
    fetchProductsData("en"),
    fetchBlogsData("en"),
  ]);

  if (!isApiError(productsRes)) {
    for (const product of (productsRes as ProductsApiResponse).data ?? []) {
      for (const locale of routing.locales) {
        const slug = getLocalizedSlug(product.slug, locale);
        if (!slug) continue;
        entries.push({
          url: localeUrl(locale, `/products/${slug}`),
          lastModified: now,
        });
      }
    }
  }

  if (!isApiError(blogsRes)) {
    for (const blog of (blogsRes as BlogsApiResponse).data ?? []) {
      for (const locale of routing.locales) {
        const slug = getLocalizedSlug(blog.slug, locale);
        if (!slug) continue;
        entries.push({
          url: localeUrl(locale, `/blogs/${slug}`),
          lastModified: now,
        });
      }
    }
  }

  return entries;
}
