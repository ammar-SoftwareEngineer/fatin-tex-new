/**
 * Fetch home page data from the backend API.
 * Cached for 60 seconds via Next.js revalidate.
 */
const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchHomeData(lang = "en") {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/home?lang=${lang}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      method: "GET",
      next: { revalidate: 5 },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch home data:", data);
      return { success: false, message: "Failed To Fetch Home Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Home data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
