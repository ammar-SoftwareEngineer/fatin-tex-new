import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { fetchHomeData } from "@/api/homeService";
import HomePage from "@/components/home/HomePage";
import { isApiError } from "@/types/layoutTypes";
import { fetchLayoutData } from "@/api/layoutService";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const layoutData = await fetchLayoutData();
  const favicon = layoutData.data?.branding?.favicon;
  return {
    title: t("title.home"),
    description: t("description.home"),

  };
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
