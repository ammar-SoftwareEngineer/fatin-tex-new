/**
 * Fetch about page data from the backend API.
 * Cached for 60 seconds via Next.js revalidate.
 */
const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchAboutData(lang = "en") {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/about?lang=${lang}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      method: "GET",
      next: { revalidate: 5 },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch about data:", data);
      return { success: false, message: "Failed To Fetch About Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("About data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
