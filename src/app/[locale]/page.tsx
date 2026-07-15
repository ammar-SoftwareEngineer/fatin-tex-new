import { setRequestLocale } from "next-intl/server";
import { fetchHomeData } from "@/api/homeService";
import HomePage from "@/components/home/HomePage";
import { isApiError } from "@/types/layoutTypes";
import { createPageMetadata } from "@/lib/seo";

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

  return (
    <HomePage data={isApiError(homeApiData) ? null : homeApiData.data} />
  );
}
