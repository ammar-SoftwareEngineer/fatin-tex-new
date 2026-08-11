import { setRequestLocale } from "next-intl/server";
import { fetchHomeData } from "@/api/homeService";
import HomePage from "@/components/home/HomePage";
import { isApiError } from "@/types/layoutTypes";
import { createPageMetadata } from "@/lib/seo";
import { fetchAboutData } from "@/api/aboutService";
import type { AboutApiResponse } from "@/types/aboutTypes";
import type { HomeData } from "@/types/homeTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createPageMetadata(params, "home");
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homeApiData = await fetchHomeData(locale);
  const aboutApiData = await fetchAboutData(locale);
  return (
    <HomePage
      data={
        isApiError(homeApiData) ? null : (homeApiData as { data: HomeData }).data
      }
      aboutData={
        isApiError(aboutApiData)
          ? null
          : (aboutApiData as AboutApiResponse).data
      }
    />
  );
}
