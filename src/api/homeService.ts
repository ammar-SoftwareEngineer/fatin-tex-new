/**
 * Fetch home page data from the backend API.
 */
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchHomeData(lang = "en") {
  try {
    const response = await fetch(`${BASE_URL}/home?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 5 },
    });
    // console.log("Home data:", await response.json()); 
    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Home data fetch error:", message);
    return { success: false, message };
  }
}
