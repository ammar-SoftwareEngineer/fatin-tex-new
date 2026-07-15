import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
import SondosPage from "@/components/sondos/SondosPage";
import { fetchSondosData } from "@/api/sondosService";
import { fetchBlogsData } from "@/api/blogsService";
import type { SondosApiResponse } from "@/types/sondosTypes";
import type { BlogsApiResponse } from "@/types/blogTypes";
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
  const [sondosResponse, blogsResponse] = await Promise.all([
    fetchSondosData(locale),
    fetchBlogsData(locale),
  ]);

  const sondosData = isApiError(sondosResponse)
    ? null
    : ((sondosResponse as SondosApiResponse).data ?? null);

  const relatedArticles = isApiError(blogsResponse)
    ? []
    : ((blogsResponse as BlogsApiResponse).data ?? []).slice(0, 3);

  return <SondosPage data={sondosData} relatedArticles={relatedArticles} />;
}
