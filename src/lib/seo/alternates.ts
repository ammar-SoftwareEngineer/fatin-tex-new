import { routing } from "@/i18n/routing";
import type { LocalizedSlug } from "@/lib/localized-slug";
import { getLocalizedSlug } from "@/lib/localized-slug";
import { getSiteUrl } from "./site";

export const HREFLANG_LOCALES = ["en", "ar"] as const;

/** Relative path used for self-referencing canonical tags. */
export function localePath(locale: string, path = ""): string {
  const normalized = path && !path.startsWith("/") ? `/${path}` : path;
  return `/${locale}${normalized}`;
}

/** Absolute URL for OG / sitemap. */
export function localeUrl(locale: string, path = ""): string {
  return `${getSiteUrl()}${localePath(locale, path)}`;
}

function resolveDefaultLocale(available: readonly string[]): string {
  return (
    [routing.defaultLocale, "en", "ar"].find((l) => available.includes(l)) ??
    available[0] ??
    routing.defaultLocale
  );
}

function withXDefault(
  languages: Record<string, string>,
  defaultLocale: string,
  path: string,
) {
  if (Object.keys(languages).length === 0) return languages;
  return {
    ...languages,
    "x-default": localeUrl(defaultLocale, path),
  };
}

export function buildLanguageAlternates(
  pathWithoutLocale = "",
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of HREFLANG_LOCALES) {
    languages[locale] = localeUrl(locale, pathWithoutLocale);
  }
  return withXDefault(
    languages,
    resolveDefaultLocale(HREFLANG_LOCALES),
    pathWithoutLocale,
  );
}

export function buildSlugLanguageAlternates(
  collection: "blogs" | "products",
  slug: LocalizedSlug,
): Record<string, string> {
  const languages: Record<string, string> = {};
  const available: string[] = [];

  for (const locale of HREFLANG_LOCALES) {
    const localSlug = getLocalizedSlug(slug, locale);
    if (!slug[locale as keyof LocalizedSlug] || !localSlug) continue;
    languages[locale] = localeUrl(locale, `/${collection}/${localSlug}`);
    available.push(locale);
  }

  if (available.length === 0) return languages;

  const defaultLocale = resolveDefaultLocale(available);
  const defaultSlug = getLocalizedSlug(slug, defaultLocale);
  if (!defaultSlug) return languages;

  return withXDefault(
    languages,
    defaultLocale,
    `/${collection}/${defaultSlug}`,
  );
}
