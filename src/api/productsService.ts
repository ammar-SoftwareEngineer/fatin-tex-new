/**
 * Fetch products list and product details from the backend API.
 */
import { fetchJson } from "./fetchJson";

const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchProductsData(lang = "en") {
  try {
    return await fetchJson(`${NEXT_PUBLIC_BACKEND_BASE_URL}/products?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 5 },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Products data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function fetchProductDetailsData(slug: string, lang = "en") {
  try {
    return await fetchJson(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/products/${slug}`,
      {
        headers: { "Content-Type": "application/json", "Accept-Language": lang },
        method: "GET",
        next: { revalidate: 60 },
      }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Product details fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
