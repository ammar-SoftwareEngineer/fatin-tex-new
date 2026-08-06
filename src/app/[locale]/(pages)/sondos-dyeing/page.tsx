import { createPageMetadata, setupPageLocale } from "@/lib/seo";
import SondosPage from "@/components/sondos/SondosPage";
import { fetchSondosData } from "@/api/sondosService";
import type { SondosData } from "@/types/sondosTypes";
import { isApiError } from "@/types/layoutTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createPageMetadata(params, "sondosDyeing");
}

export default async function SondosDyeingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await setupPageLocale(params);
  const sondosResponse = await fetchSondosData(locale);

  // API returns { breadcrumb, content } directly — not nested under .data
  const sondosData = isApiError(sondosResponse)
    ? null
    : (sondosResponse as SondosData);

  return <SondosPage data={sondosData} />;
}
