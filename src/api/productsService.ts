/**
 * Fetch products list and product details from the backend API.
 */
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchProductsData(lang = "en") {
  try {
    const response = await fetch(`${BASE_URL}/products?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 5 },
    });
    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Products data fetch error:", message);
    return { success: false, message };
  }
}

export async function fetchProductDetailsData(slug: string, lang = "en") {
  try {
    const response = await fetch(`${BASE_URL}/products/${slug}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 60 },
    });
    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Product details fetch error:", message);
    return { success: false, message };
  }
}
