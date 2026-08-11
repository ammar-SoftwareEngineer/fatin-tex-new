import { createPageMetadata, setupPageLocale } from "@/lib/seo";
import MediaPageView from "@/components/media/MediaPage";
import { fetchGalleryImagesData } from "@/api/galleryService";
import type { GalleryItem } from "@/components/media/mediaTypes";

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
  const response = (await fetchGalleryImagesData(locale)) as {
    data?: GalleryItem[];
  };
  const items = Array.isArray(response?.data) ? response.data : [];

  return <MediaPageView type="images" items={items} />;
}
