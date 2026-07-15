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
