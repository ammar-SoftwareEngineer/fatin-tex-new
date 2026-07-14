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
  const layoutData = await fetchLayoutData(locale);
  const favicon = !isApiError(layoutData)
    ? layoutData.data?.branding?.favicon
    : undefined;

  return {
    title: t("title.home"),
    description: t("description.home"),
    icons: favicon
      ? {
          icon: [{ url: favicon, type: "image/webp" }],
          shortcut: favicon,
          apple: favicon,
        }
      : undefined,
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
