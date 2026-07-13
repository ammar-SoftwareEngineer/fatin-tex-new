const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchGalleryImagesData(lang = "en") {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/gallery-images`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang,
        },
        method: "GET",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch gallery images data:", data);
      return { success: false, message: "Failed To Fetch Gallery Images Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Gallery images fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function fetchGalleryVideosData(lang = "en") {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/gallery-videos`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang,
        },
        method: "GET",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch gallery videos data:", data);
      return { success: false, message: "Failed To Fetch Gallery Videos Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Gallery videos fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
