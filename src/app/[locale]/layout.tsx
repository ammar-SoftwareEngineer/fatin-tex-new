import type { Metadata } from "next";
import { Inter, Playfair_Display, Cairo } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/header/Navbar";
import Footer from "@/components/layout/footer/Footer";
import FixedContactIcons from "@/components/layout/call-to-action/FixedContactIcons";
import { SlugAlternatesProvider } from "@/components/i18n/SlugAlternatesProvider";
import { routing } from "@/i18n/routing";
import { getIndexRobots, getSiteUrl } from "@/lib/seo/site";
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

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: t("title.default"),
      template: `%s | ${t("title.default")}`,
    },
    description: t("description.default"),
    robots: getIndexRobots(),
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

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${playfair.variable} ${cairo.variable}`}
    >
      <body className="min-h-screen bg-[#0b0f19] text-white font-inter antialiased">
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
