import { fetchLayoutData } from "@/api/layoutService";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isApiError } from "@/types/layoutTypes";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function createPageMetadata(
  params: Promise<{ locale: string }>,
  page: keyof {
    home: string;
    about: string;
    blogs: string;
    products: string;
    categories: string;
    contact: string;
    media: string;
    sondosDyeing: string;
  }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const layoutData = await fetchLayoutData(locale);
  const favicon = !isApiError(layoutData)
    ? layoutData.data?.branding?.favicon
    : undefined;
  const title = !isApiError(layoutData)
    ? layoutData.data?.branding?.site_name
    : undefined;
  return {
    title: t(`title.${page}`),
    description: t(`description.${page}`),
    icons: favicon
      ? {
          icon: [{ url: favicon, type: "image/webp" }],
          shortcut: favicon,
          apple: favicon,
        }
      : undefined,
    openGraph: {
      title: t(`title.${page}`),
      description: t(`description.${page}`),
      url:
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
        "https://fatin-tex.g-homes.net",
      siteName: title,
      type: "website",
      images: favicon ? [{ url: favicon, type: "image/webp" }] : undefined,
    },
  };
}

export async function setupPageLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale;
}
