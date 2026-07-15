import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NotFoundContent from "@/components/common/NotFoundContent";

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
    <NotFoundContent
      brandName={t("brandName")}
      title="404"
      description="Page not found"
      homeLabel={t("exploreMore")}
    />
  );
}
