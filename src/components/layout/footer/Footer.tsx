    import { getLocale } from "next-intl/server";
import { fetchLayoutData } from "@/api/layoutService";
import FooterClient from "./FooterClient";

export default async function Footer() {
  const locale = await getLocale();
  const layoutData = await fetchLayoutData(locale);

  return <FooterClient layoutData={layoutData} />;
}
