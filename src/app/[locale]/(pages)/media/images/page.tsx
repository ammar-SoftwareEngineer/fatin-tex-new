import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
import MediaPageView from "@/components/media/MediaPage";
import { fetchGalleryImagesData } from "@/api/galleryService";
import { normalizeGalleryItems } from "@/lib/gallery";

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
  const items = normalizeGalleryItems(response);

  return <MediaPageView type="images" items={items} />;
}
