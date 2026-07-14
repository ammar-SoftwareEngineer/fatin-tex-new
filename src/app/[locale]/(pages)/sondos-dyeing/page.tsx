import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
import SondosPage from "@/components/sondos/SondosPage";

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
  await setupPageLocale(params);
  return <SondosPage />;
}
