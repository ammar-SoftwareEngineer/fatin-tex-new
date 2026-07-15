import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { fetchLayoutData } from "@/api/layoutService";
import { routing } from "@/i18n/routing";
import type { LocalizedSlug } from "@/lib/localized-slug";
import { getLocalizedSlug } from "@/lib/localized-slug";
import { isApiError } from "@/types/layoutTypes";

export const SITE_URL_FALLBACK = "https://fatin-tex-new.vercel.app";
export const HREFLANG_LOCALES = ["en", "ar"] as const;

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
    /\/$/,
    "",
  );
  if (vercelProduction) {
    return vercelProduction.startsWith("http")
      ? vercelProduction
      : `https://${vercelProduction}`;
  }

  const vercelUrl = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercelUrl) {
    return vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`;
  }

  return SITE_URL_FALLBACK;
}

/** Index unless explicitly marked as staging/preview/development. */
export function isProductionSite(): boolean {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV?.toLowerCase();
  if (
    siteEnv === "staging" ||
    siteEnv === "preview" ||
    siteEnv === "development"
  ) {
    return false;
  }
  if (siteEnv === "production") return true;

  if (process.env.VERCEL_ENV === "preview") return false;
  if (process.env.VERCEL_ENV === "production") return true;

  return process.env.NODE_ENV === "production";
}

export function getIndexRobots(): Metadata["robots"] {
  if (!isProductionSite()) {
    return { index: false, follow: false };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  };
}

/** Absolute URL for OG / sitemap. */
export function localeUrl(locale: string, path = ""): string {
  return `${getSiteUrl()}${localePath(locale, path)}`;
}

/** Relative path used for self-referencing canonical tags. */
export function localePath(locale: string, path = ""): string {
  const normalized = path
    ? path.startsWith("/")
      ? path
      : `/${path}`
    : "";
  return `/${locale}${normalized}`;
}

function resolveDefaultLocale(available: readonly string[]): string {
  if (available.includes(routing.defaultLocale)) return routing.defaultLocale;
  if (available.includes("en")) return "en";
  if (available.includes("ar")) return "ar";
  return available[0] ?? routing.defaultLocale;
}

export function buildLanguageAlternates(
  pathWithoutLocale = "",
  availableLocales: readonly string[] = HREFLANG_LOCALES,
): Record<string, string> {
  const languages: Record<string, string> = {};
  const locales = availableLocales.filter((locale) =>
    (HREFLANG_LOCALES as readonly string[]).includes(locale),
  );

  for (const locale of locales) {
    languages[locale] = localeUrl(locale, pathWithoutLocale);
  }

  if (locales.length > 0) {
    languages["x-default"] = localeUrl(
      resolveDefaultLocale(locales),
      pathWithoutLocale,
    );
  }

  return languages;
}

export function buildSlugLanguageAlternates(
  collection: "blogs" | "products",
  slug: LocalizedSlug,
): Record<string, string> {
  const languages: Record<string, string> = {};
  const available: string[] = [];

  for (const locale of HREFLANG_LOCALES) {
    const raw = slug[locale as keyof LocalizedSlug];
    const localSlug = getLocalizedSlug(slug, locale);
    if (raw && localSlug) {
      languages[locale] = localeUrl(locale, `/${collection}/${localSlug}`);
      available.push(locale);
    }
  }

  if (available.length > 0) {
    const defaultLocale = resolveDefaultLocale(available);
    const defaultSlug = getLocalizedSlug(slug, defaultLocale);
    if (defaultSlug) {
      languages["x-default"] = localeUrl(
        defaultLocale,
        `/${collection}/${defaultSlug}`,
      );
    }
  }

  return languages;
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
  const logo = !isApiError(layoutData)
    ? layoutData.data?.branding?.logo
    : undefined;
  const siteName = !isApiError(layoutData)
    ? layoutData.data?.branding?.site_name
    : undefined;

  const localSlug = getLocalizedSlug(slug, locale);
  const path = `/${collection}/${localSlug}`;
  const canonical = localePath(locale, path);
  const absoluteUrl = localeUrl(locale, path);
  const ogImage = image || logo || favicon;
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
      url: absoluteUrl,
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
      description: desc,
      images: ogImage ? [ogImage] : undefined,
    },
  };
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
  const layoutData = await fetchLayoutData(locale);
  const favicon = !isApiError(layoutData)
    ? layoutData.data?.branding?.favicon
    : undefined;
  const logo = !isApiError(layoutData)
    ? layoutData.data?.branding?.logo
    : undefined;
  const siteName = !isApiError(layoutData)
    ? layoutData.data?.branding?.site_name
    : undefined;

  const path = options.path ?? PAGE_PATHS[page];
  const canonical = localePath(locale, path);
  const absoluteUrl = localeUrl(locale, path);
  const title = t(`title.${page}`);
  const description = t(`description.${page}`);
  const ogImage = options.image || logo || favicon;

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
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName,
      locale,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export async function setupPageLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale;
}
