import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { LocalizedSlug } from "@/lib/localized-slug";
import { getLocalizedSlug } from "@/lib/localized-slug";

export const SITE_URL_FALLBACK = "https://fatin-tex.g-homes.net";

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? SITE_URL_FALLBACK
  );
}

export function isProductionSite(): boolean {
  return process.env.NEXT_PUBLIC_SITE_ENV === "production";
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

export function localeUrl(locale: string, path = ""): string {
  const normalized = path
    ? path.startsWith("/")
      ? path
      : `/${path}`
    : "";
  return `${getSiteUrl()}/${locale}${normalized}`;
}

export function buildLanguageAlternates(
  pathWithoutLocale = "",
): Record<string, string> {
  const normalized = pathWithoutLocale
    ? pathWithoutLocale.startsWith("/")
      ? pathWithoutLocale
      : `/${pathWithoutLocale}`
    : "";

  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = localeUrl(locale, normalized);
  }
  languages["x-default"] = localeUrl(routing.defaultLocale, normalized);
  return languages;
}

export function buildSlugLanguageAlternates(
  collection: "blogs" | "products",
  slug: LocalizedSlug,
): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    const localSlug = getLocalizedSlug(slug, locale);
    const raw = slug[locale as keyof LocalizedSlug];
    if (raw && localSlug) {
      languages[locale] = localeUrl(locale, `/${collection}/${localSlug}`);
    }
  }

  const defaultLocale = slug.en
    ? "en"
    : slug.ar
      ? "ar"
      : slug.tr
        ? "tr"
        : routing.defaultLocale;
  const defaultSlug = getLocalizedSlug(slug, defaultLocale);
  if (defaultSlug) {
    languages["x-default"] = localeUrl(
      defaultLocale,
      `/${collection}/${defaultSlug}`,
    );
  }

  return languages;
}
