/**
 * Fetch gallery images and videos from the backend API.
 */
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchGalleryImagesData(lang = "en") {
  try {
    const response = await fetch(`${BASE_URL}/gallery-images?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 5 },
    });
    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Gallery images fetch error:", message);
    return { success: false, message };
  }
}

export async function fetchGalleryVideosData(lang = "en") {
  try {
    const response = await fetch(`${BASE_URL}/gallery-videos`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 60 },
    });
    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Gallery videos fetch error:", message);
    return { success: false, message };
  }
}
