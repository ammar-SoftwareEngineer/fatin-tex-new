import { createPageMetadata, setupPageLocale } from "@/lib/seo";
import ProductsPage from "@/components/products/ProductsPage";
import { fetchProductsData } from "@/api/productsService";
import { isApiError } from "@/types/layoutTypes";
import type { ProductsApiResponse } from "@/types/productTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createPageMetadata(params, "products");
}

export default async function Products({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const locale = await setupPageLocale(params);
  const { category } = await searchParams;
  const productsResponse = await fetchProductsData(locale);

  const products = isApiError(productsResponse)
    ? null
    : (productsResponse as ProductsApiResponse).data;

  return (
    <ProductsPage productsData={products} categorySlug={category ?? null} />
  );
}
