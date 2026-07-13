import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
import AboutPageView from "@/components/about/AboutPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createPageMetadata(params, "about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await setupPageLocale(params);
  return <AboutPageView />;
}
