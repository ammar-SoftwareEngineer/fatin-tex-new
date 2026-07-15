import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold text-[#e0bc80]">404</h1>
      <p className="mt-4 text-xl text-gray-300">Page not found</p>
      <p className="mt-2 text-gray-500">{t("brandName")}</p>
    </div>
  );
}
