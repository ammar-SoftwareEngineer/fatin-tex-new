import { getTranslations } from "next-intl/server";

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
