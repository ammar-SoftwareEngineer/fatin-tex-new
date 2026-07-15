import { isApiError } from "@/types/layoutTypes";

const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export type GalleryItem = {
  id: number | string;
  url: string;
  thumbnail?: string;
  title?: string;
};

/** يوحّد شكل رد الـ API للمعرض */
export function normalizeGalleryItems(response: unknown): GalleryItem[] {
  if (isApiError(response) || !response || typeof response !== "object") {
    return [];
  }

  const data = (response as { data?: unknown }).data;
  const list = Array.isArray(data)
    ? data
    : Array.isArray(response)
      ? response
      : [];

  return list
    .map((item, index) => {
      const raw = (item ?? {}) as Record<string, unknown>;
      const url = [raw.url, raw.image, raw.video, raw.src, raw.file, raw.path].find(
        (value): value is string => typeof value === "string" && Boolean(value.trim()),
      );
      const thumbnail = [
        raw.thumbnail,
        raw.cover,
        raw.image,
        raw.poster,
      ].find(
        (value): value is string => typeof value === "string" && Boolean(value.trim()),
      );
      const title = [raw.title, raw.name, raw.caption].find(
        (value): value is string => typeof value === "string" && Boolean(value.trim()),
      );

      return {
        id: (raw.id as number | string) ?? index,
        url: url || "",
        thumbnail,
        title,
      };
    })
    .filter((item) => Boolean(item.url));
}

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
