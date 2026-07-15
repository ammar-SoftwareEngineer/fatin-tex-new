import type { Metadata } from "next";
import { Inter, Playfair_Display, Cairo } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/header/Navbar";
import Footer from "@/components/layout/footer/Footer";
import FixedContactIcons from "@/components/layout/call-to-action/FixedContactIcons";
import { SlugAlternatesProvider } from "@/components/i18n/SlugAlternatesProvider";
import JsonLd from "@/components/seo/JsonLd";
import { fetchLayoutData } from "@/api/layoutService";
import { routing } from "@/i18n/routing";
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo/json-ld";
import { getIndexRobots, getSiteUrl, localeUrl } from "@/lib/seo/site";
import { isApiError } from "@/types/layoutTypes";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const layoutData = await fetchLayoutData(locale);
  const branding = !isApiError(layoutData)
    ? layoutData.data?.branding
    : undefined;
  const title = t("title.default");
  const description = t("description.default");
  const ogImage = branding?.logo || branding?.favicon;
  const canonical = localeUrl(locale);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    robots: getIndexRobots(),
    icons: branding?.favicon
      ? {
          icon: [{ url: branding.favicon, type: "image/webp" }],
          shortcut: branding.favicon,
          apple: branding.favicon,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: branding?.site_name || title,
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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const layoutData = await fetchLayoutData(locale);
  const layout = !isApiError(layoutData) ? layoutData.data : null;
  const siteName = layout?.branding?.site_name;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${playfair.variable} ${cairo.variable}`}
    >
      <body className="min-h-screen bg-[#0b0f19] text-white font-inter antialiased">
        <JsonLd data={buildOrganizationJsonLd(locale, layout)} />
        <JsonLd data={buildWebSiteJsonLd(locale, siteName)} />
        <NextIntlClientProvider messages={messages}>
          <SlugAlternatesProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <FixedContactIcons />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SlugAlternatesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
