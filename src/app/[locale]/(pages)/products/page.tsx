import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
import ProductsPageView from "@/components/products/ProductsPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createPageMetadata(params, "products");
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await setupPageLocale(params);
  return <ProductsPageView />;
}
