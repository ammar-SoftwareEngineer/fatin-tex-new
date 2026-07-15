import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { fetchLayoutData } from "@/api/layoutService";
import type { LocalizedSlug } from "@/lib/localized-slug";
import { getLocalizedSlug } from "@/lib/localized-slug";
import { isApiError } from "@/types/layoutTypes";
import {
  buildLanguageAlternates,
  buildSlugLanguageAlternates,
  localePath,
  localeUrl,
} from "./alternates";
import { getIndexRobots, getSiteUrl } from "./site";

type Branding = {
  favicon?: string;
  logo?: string;
  siteName?: string;
};

async function getBranding(locale: string): Promise<Branding> {
  const layoutData = await fetchLayoutData(locale);
  if (isApiError(layoutData)) return {};
  const branding = layoutData.data?.branding;
  return {
    favicon: branding?.favicon,
    logo: branding?.logo,
    siteName: branding?.site_name,
  };
}

type BaseMetaInput = {
  locale: string;
  path: string;
  title: string;
  description?: string;
  image?: string | null;
  languages: Record<string, string>;
  type?: "article" | "website";
  publishedAt?: string | null;
  modifiedAt?: string | null;
};

async function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  languages,
  type = "website",
  publishedAt,
  modifiedAt,
}: BaseMetaInput): Promise<Metadata> {
  const { favicon, logo, siteName } = await getBranding(locale);
  const ogImage = image || logo || favicon;
  const url = localeUrl(locale, path);

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    robots: getIndexRobots(),
    icons: favicon
      ? {
          icon: [{ url: favicon, type: "image/webp" }],
          shortcut: favicon,
          apple: favicon,
        }
      : undefined,
    alternates: {
      canonical: localePath(locale, path),
      languages,
    },
    openGraph: {
      title,
      description,
      url,
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

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

export function createEntityMetadata({
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
  const path = `/${collection}/${getLocalizedSlug(slug, locale)}`;
  return buildMetadata({
    locale,
    path,
    title,
    description: description?.trim() || undefined,
    image,
    languages: buildSlugLanguageAlternates(collection, slug),
    type,
    publishedAt,
    modifiedAt,
  });
}

type PageKey =
  | "home"
  | "about"
  | "blogs"
  | "products"
  | "categories"
  | "contact"
  | "media"
  | "mediaImages"
  | "mediaVideos"
  | "sondosDyeing";

const PAGE_PATHS: Record<PageKey, string> = {
  home: "",
  about: "/about",
  blogs: "/blogs",
  products: "/products",
  categories: "/categories",
  contact: "/contact",
  media: "/media",
  mediaImages: "/media/images",
  mediaVideos: "/media/videos",
  sondosDyeing: "/sondos-dyeing",
};

/** Metadata للصفحات الثابتة (title / description / canonical / OG) */
export async function createPageMetadata(
  params: Promise<{ locale: string }>,
  page: PageKey,
  options: { path?: string; image?: string | null } = {},
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const path = options.path ?? PAGE_PATHS[page];

  return buildMetadata({
    locale,
    path,
    title: t(`title.${page}`),
    description: t(`description.${page}`),
    image: options.image,
    languages: buildLanguageAlternates(path),
  });
}

export async function setupPageLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale;
}
