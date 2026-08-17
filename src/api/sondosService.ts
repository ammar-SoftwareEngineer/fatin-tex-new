/**
 * Fetch Sondos Dyeing page data from the backend API.
 */
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchSondosData(lang = "en") {
  try {
    const response = await fetch(`${BASE_URL}/sondos-dyeing?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 5 },
    });
    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Sondos data fetch error:", message);
    return { success: false, message };
  }
}
