export type LocalizedSlug = {
  en?: string;
  ar?: string;
  tr?: string;
};

export function getLocalizedSlug(
  slug?: LocalizedSlug | string | null,
  locale = "en",
): string {
  if (!slug) return "";
  if (typeof slug === "string") return slug;

  const byLocale = slug[locale as keyof LocalizedSlug];
  return byLocale || slug.en || slug.ar || slug.tr || "";
}

export function matchesLocalizedSlug(
  slug: LocalizedSlug | undefined | null,
  value: string | null | undefined,
): boolean {
  if (!value || !slug) return false;

  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  return [slug.en, slug.ar, slug.tr].some(
    (entry) => entry === value || entry === decoded,
  );
}

/** When switching locale on product/blog detail URLs, swap the slug segment. */
export function localizeSlugPathname(
  pathname: string,
  targetLocale: string,
  alternates?: LocalizedSlug | null,
): string {
  if (!alternates) return pathname;

  const match = pathname.match(/^\/(products|blogs)\/([^/]+)\/?$/);
  if (!match) return pathname;

  const nextSlug = getLocalizedSlug(alternates, targetLocale);
  return nextSlug ? `/${match[1]}/${nextSlug}` : pathname;
}
