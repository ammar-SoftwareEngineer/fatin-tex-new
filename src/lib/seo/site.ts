import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { LocalizedSlug } from "@/lib/localized-slug";
import { getLocalizedSlug } from "@/lib/localized-slug";

export const SITE_URL_FALLBACK = "https://fatin-tex.g-homes.net";

/** Locales emitted in hreflang (plus x-default when applicable). */
export const HREFLANG_LOCALES = ["en", "ar"] as const;

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

function resolveDefaultLocale(
  available: readonly string[],
): string {
  if (available.includes(routing.defaultLocale)) {
    return routing.defaultLocale;
  }
  if (available.includes("en")) return "en";
  if (available.includes("ar")) return "ar";
  return available[0] ?? routing.defaultLocale;
}

/**
 * Build hreflang map for static paths.
 * Only emits locales that exist in HREFLANG_LOCALES (en/ar) + x-default.
 */
export function buildLanguageAlternates(
  pathWithoutLocale = "",
  availableLocales: readonly string[] = HREFLANG_LOCALES,
): Record<string, string> {
  const normalized = pathWithoutLocale
    ? pathWithoutLocale.startsWith("/")
      ? pathWithoutLocale
      : `/${pathWithoutLocale}`
    : "";

  const languages: Record<string, string> = {};
  const locales = availableLocales.filter((locale) =>
    (HREFLANG_LOCALES as readonly string[]).includes(locale),
  );

  for (const locale of locales) {
    languages[locale] = localeUrl(locale, normalized);
  }

  if (locales.length > 0) {
    const defaultLocale = resolveDefaultLocale(locales);
    languages["x-default"] = localeUrl(defaultLocale, normalized);
  }

  return languages;
}

/**
 * Build hreflang for entity pages — only when a localized slug exists.
 */
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

/** Locales that have a real translation for the current slug (UI switcher). */
export function getAvailableSlugLocales(
  slug?: LocalizedSlug | null,
): string[] {
  if (!slug) {
    return [...routing.locales];
  }

  return routing.locales.filter((locale) => {
    const raw = slug[locale as keyof LocalizedSlug];
    return Boolean(raw && getLocalizedSlug(slug, locale));
  });
}
