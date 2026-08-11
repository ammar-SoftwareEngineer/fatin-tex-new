/**
 * Fetch categories list and category details from the backend API.
 */
import { fetchJson } from "./fetchJson";

const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchCategoriesData(lang = "en") {
  try {
    return await fetchJson(`${NEXT_PUBLIC_BACKEND_BASE_URL}/categories?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 5 },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Categories data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function fetchCategoryDetailsData(slug: string, lang = "en") {
  try {
    return await fetchJson(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/categories/${slug}`,
      {
        headers: { "Content-Type": "application/json", "Accept-Language": lang },
        method: "GET",
        next: { revalidate: 60 },
      }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Category details fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
