import { isApiError } from "@/types/layoutTypes";

export type GalleryItem = {
  id: number | string;
  url: string;
  thumbnail?: string;
  title?: string;
};

type RawGalleryItem = Record<string, unknown>;

function pickString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value;
  }
  return "";
}

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
      const raw = (item ?? {}) as RawGalleryItem;
      const url = pickString(
        raw.url,
        raw.image,
        raw.video,
        raw.src,
        raw.file,
        raw.path,
      );
      const thumbnail = pickString(
        raw.thumbnail,
        raw.cover,
        raw.image,
        raw.poster,
      );
      const title = pickString(raw.title, raw.name, raw.caption);

      return {
        id: (raw.id as number | string) ?? index,
        url,
        thumbnail: thumbnail || undefined,
        title: title || undefined,
      };
    })
    .filter((item) => Boolean(item.url));
}
