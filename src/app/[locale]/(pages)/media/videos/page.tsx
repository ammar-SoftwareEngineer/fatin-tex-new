import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
import MediaPageView from "@/components/media/MediaPage";
import { fetchGalleryVideosData } from "@/api/galleryService";
import { normalizeGalleryItems } from "@/lib/gallery";

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
