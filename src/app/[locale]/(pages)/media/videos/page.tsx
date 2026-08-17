import { createPageMetadata, setupPageLocale } from "@/lib/seo";
import MediaPageView from "@/components/media/MediaPage";
import { fetchGalleryVideosData } from "@/api/galleryService";
import { isApiError } from "@/types/layoutTypes";
import type { GalleryApiResponse } from "@/components/media/mediaTypes";

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
  const items = isApiError(response)
    ? []
    : ((response as GalleryApiResponse).data ?? []);

  return <MediaPageView type="videos" items={items} />;
}
