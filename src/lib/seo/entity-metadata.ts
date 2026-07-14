import type { Metadata } from "next";
import { fetchLayoutData } from "@/api/layoutService";
import { isApiError } from "@/types/layoutTypes";
import type { LocalizedSlug } from "@/lib/localized-slug";
import { getLocalizedSlug } from "@/lib/localized-slug";
import {
  buildSlugLanguageAlternates,
  getIndexRobots,
  getSiteUrl,
  localeUrl,
} from "@/lib/seo/site";

type EntityMetaInput = {
  locale: string;
  collection: "blogs" | "products";
  slug: LocalizedSlug;
  title: string;
  description?: string | null;
  image?: string | null;
  publishedAt?: string | null;
  modifiedAt?: string | null;
  type?: "article" | "website";
};

export async function createEntityMetadata({
  locale,
  collection,
  slug,
  title,
  description,
  image,
  publishedAt,
  modifiedAt,
  type = "website",
}: EntityMetaInput): Promise<Metadata> {
  const layoutData = await fetchLayoutData(locale);
  const favicon = !isApiError(layoutData)
    ? layoutData.data?.branding?.favicon
    : undefined;
  const siteName = !isApiError(layoutData)
    ? layoutData.data?.branding?.site_name
    : undefined;

  const localSlug = getLocalizedSlug(slug, locale);
  const path = `/${collection}/${localSlug}`;
  const canonical = localeUrl(locale, path);
  const ogImage = image || favicon;
  const desc = description?.trim() || undefined;

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description: desc,
    robots: getIndexRobots(),
    icons: favicon
      ? {
          icon: [{ url: favicon, type: "image/webp" }],
          shortcut: favicon,
          apple: favicon,
        }
      : undefined,
    alternates: {
      canonical,
      languages: buildSlugLanguageAlternates(collection, slug),
    },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      siteName,
      locale,
      type,
      images: ogImage ? [{ url: ogImage }] : undefined,
      ...(type === "article"
        ? {
            publishedTime: publishedAt || undefined,
            modifiedTime: modifiedAt || publishedAt || undefined,
          }
        : {}),
    },
  };
}
