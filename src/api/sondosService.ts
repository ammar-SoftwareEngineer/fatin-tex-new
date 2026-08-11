/**
 * Fetch Sondos Dyeing page data from the backend API.
 */
import { fetchJson } from "./fetchJson";

const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchSondosData(lang = "en") {
  try {
    return await fetchJson(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/sondos-dyeing?lang=${lang}`,
      {
        headers: { "Content-Type": "application/json", "Accept-Language": lang },
        method: "GET",
        next: { revalidate: 5 },
      }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Sondos data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
