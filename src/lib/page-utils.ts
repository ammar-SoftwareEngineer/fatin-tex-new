import { fetchLayoutData } from "@/api/layoutService";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

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
    contact: string;
    media: string;
    sondosDyeing: string;
  }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const layoutData = await fetchLayoutData();
  const favicon = layoutData.data?.branding?.favicon;
  const title = layoutData.data?.branding?.site_name;
  return {
    title: t(`title.${page}`),
    description: t(`description.${page}`),
    icons: {
      icon: [{ url: favicon , type: "image/webp" }],
      shortcut: favicon ,
      apple: favicon ,
    },
    openGraph: {
      title: t(`title.${page}`),
      description: t(`description.${page}`),
      url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://fatin-tex.g-homes.net",
      siteName: title,
      type: "website",
      images: [{ url: favicon , type: "image/webp" }],
    },
  };
}

export async function setupPageLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale;
}
