/**
 * Fetch layout data (branding, menu, footer) from the backend API.
 */
const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchLayoutData(lang = "en") {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/layout?lang=${lang}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      method: "GET",
      next: { revalidate: 5 },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch layout data:", data);
      return { success: false, message: "Failed To Fetch Layout Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Layout data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
