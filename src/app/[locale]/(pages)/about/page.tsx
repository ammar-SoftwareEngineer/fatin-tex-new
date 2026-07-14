import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
import AboutPageView from "@/components/about/AboutPage";
import { fetchAboutData } from "@/api/aboutService";
import { isApiError } from "@/types/layoutTypes";
import type { AboutApiResponse } from "@/types/aboutTypes";

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
  const locale = await setupPageLocale(params);
  const aboutResponse = await fetchAboutData(locale);

  const aboutData = isApiError(aboutResponse)
    ? null
    : ((aboutResponse as AboutApiResponse).data ?? null);

  return <AboutPageView aboutData={aboutData} />;
}
