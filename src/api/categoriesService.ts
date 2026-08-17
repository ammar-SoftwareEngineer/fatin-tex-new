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
