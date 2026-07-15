import { fetchLayoutData } from "@/api/layoutService";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isApiError } from "@/types/layoutTypes";
import {
  buildLanguageAlternates,
  getIndexRobots,
  getSiteUrl,
  localeUrl,
} from "@/lib/seo/site";

type PageKey =
  | "home"
  | "about"
  | "blogs"
  | "products"
  | "categories"
  | "contact"
  | "media"
  | "mediaImages"
  | "mediaVideos"
  | "sondosDyeing";

const PAGE_PATHS: Record<PageKey, string> = {
  home: "",
  about: "/about",
  blogs: "/blogs",
  products: "/products",
  categories: "/categories",
  contact: "/contact",
  media: "/media",
  mediaImages: "/media/images",
  mediaVideos: "/media/videos",
  sondosDyeing: "/sondos-dyeing",
};

type CreatePageMetadataOptions = {
  path?: string;
  image?: string | null;
};

export async function createPageMetadata(
  params: Promise<{ locale: string }>,
  page: PageKey,
  options: CreatePageMetadataOptions = {},
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const layoutData = await fetchLayoutData(locale);
  const favicon = !isApiError(layoutData)
    ? layoutData.data?.branding?.favicon
    : undefined;
  const logo = !isApiError(layoutData)
    ? layoutData.data?.branding?.logo
    : undefined;
  const siteName = !isApiError(layoutData)
    ? layoutData.data?.branding?.site_name
    : undefined;

  const path = options.path ?? PAGE_PATHS[page];
  const canonical = localeUrl(locale, path);
  const title = t(`title.${page}`);
  const description = t(`description.${page}`);
  const ogImage = options.image || logo || favicon;

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    robots: getIndexRobots(),
    icons: favicon
      ? {
          icon: [{ url: favicon, type: "image/webp" }],
          shortcut: favicon,
          apple: favicon,
        }
      : undefined,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export async function setupPageLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale;
}
