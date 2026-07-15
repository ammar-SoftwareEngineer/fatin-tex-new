import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
import SondosPage from "@/components/sondos/SondosPage";
import { fetchSondosData } from "@/api/sondosService";
import type { SondosApiResponse } from "@/types/sondosTypes";
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

  const sondosData = isApiError(sondosResponse)
    ? null
    : ((sondosResponse as SondosApiResponse).data ?? null);

  return <SondosPage data={sondosData} />;
}
