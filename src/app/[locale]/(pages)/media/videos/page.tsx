import { createPageMetadata, setupPageLocale } from "@/lib/seo";
import MediaPageView from "@/components/media/MediaPage";
import {
  fetchGalleryVideosData,
  normalizeGalleryItems,
} from "@/api/galleryService";

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
  const response = await fetchGalleryVideosData(locale);
  const items = normalizeGalleryItems(response);

  return <MediaPageView type="videos" items={items} />;
}
