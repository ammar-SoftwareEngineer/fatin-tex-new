import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
import MediaPageView from "@/components/media/MediaPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createPageMetadata(params, "media");
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await setupPageLocale(params);
  return <MediaPageView />;
}
