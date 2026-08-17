import { createPageMetadata, setupPageLocale } from "@/lib/seo";
import MediaPageView from "@/components/media/MediaPage";
import { fetchGalleryImagesData } from "@/api/galleryService";
import { isApiError } from "@/types/layoutTypes";
import type { GalleryApiResponse } from "@/components/media/mediaTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createPageMetadata(params, "mediaImages");
}

export default async function MediaImagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await setupPageLocale(params);
  const response = await fetchGalleryImagesData(locale);
  const payload = isApiError(response)
    ? null
    : (response as GalleryApiResponse).data;
  const items = Array.isArray(payload) ? payload : [];

  return <MediaPageView type="images" items={items} />;
}
