/**
 * Shared types for the media / gallery pages.
 */
export type MediaType = "images" | "videos";

export type GalleryItem = {
  id: number | string;
  url: string;
  thumbnail?: string;
  title?: string;
};
