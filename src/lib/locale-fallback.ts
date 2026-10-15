/**
 * Find an item's slug in the current language when the URL has a slug
 * from another language (e.g. after switching language on a product page).
 */
import { routing } from "@/i18n/routing";
import type { LocalizedSlug } from "@/lib/localized-slug";

/** Returned URL-encoded, since redirect headers can't hold Arabic characters. */
export async function findSlugInLocale(
  slug: string,
  locale: string,
  fetcher: (slug: string, lang: string) => Promise<{ data?: { slug?: LocalizedSlug } } | null>,
): Promise<string | null> {
  for (const lang of routing.locales) {
    if (lang === locale) continue;
    const response = await fetcher(slug, lang);
    const localized = response?.data?.slug?.[locale as keyof LocalizedSlug];
    if (localized) return encodeURIComponent(localized);
  }
  return null;
}
