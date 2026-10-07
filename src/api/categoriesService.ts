/**
 * Fetch categories list and category details from the backend API.
 */
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchCategoriesData(lang = "en") {
  try {
    const response = await fetch(`${BASE_URL}/categories?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 5 },
    });
    return await response.json();
    
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Categories data fetch error:", message);
    return { success: false, message };
  }
}

type CategoryNode = {
  slug?: { en?: string; ar?: string; tr?: string };
  children?: CategoryNode[];
};

/**
 * Collect the slugs (all locales) of a category and all of its descendants.
 * The details endpoint only returns one level of children, so each child is
 * fetched in turn up to `maxDepth` levels.
 */
export async function fetchCategoryTreeSlugs(
  slug: string,
  lang = "en",
  maxDepth = 3,
): Promise<string[]> {
  const response = await fetchCategoryDetailsData(encodeURIComponent(slug), lang);
  const category: CategoryNode | undefined = response?.data;
  if (!category) return [slug];

  const ownSlugs = Object.values(category.slug ?? {}).filter(Boolean) as string[];
  const children = category.children ?? [];
  if (maxDepth <= 1 || !children.length) return [slug, ...ownSlugs];

  const childSlugs = await Promise.all(
    children.map((child) => {
      const childSlug = child.slug?.en || child.slug?.ar || child.slug?.tr;
      return childSlug
        ? fetchCategoryTreeSlugs(childSlug, lang, maxDepth - 1)
        : Promise.resolve([]);
    }),
  );

  return [slug, ...ownSlugs, ...childSlugs.flat()];
}

export async function fetchCategoryDetailsData(slug: string, lang = "en") {
  try {
    const response = await fetch(`${BASE_URL}/categories/${slug}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 60 },
    });
    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Category details fetch error:", message);
    return { success: false, message };
  }
}
