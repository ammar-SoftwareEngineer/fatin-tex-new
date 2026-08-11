import { createPageMetadata, setupPageLocale } from "@/lib/seo";
import MediaPageView from "@/components/media/MediaPage";
import { fetchGalleryVideosData } from "@/api/galleryService";
import type { GalleryItem } from "@/components/media/mediaTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createPageMetadata(params, "mediaVideos");
}

export default async function MediaVideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await setupPageLocale(params);
  const response = (await fetchGalleryVideosData(locale)) as {
    data?: GalleryItem[];
  };
  const items = Array.isArray(response?.data) ? response.data : [];

  return <MediaPageView type="videos" items={items} />;
}
