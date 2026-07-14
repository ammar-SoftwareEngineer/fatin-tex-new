import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/details/ProductDetails";
import { fetchProductDetailsData } from "@/api/productsService";
import { createEntityMetadata } from "@/lib/seo/entity-metadata";
import { setupPageLocale } from "@/lib/page-utils";
import { isApiError } from "@/types/layoutTypes";
import type { ProductDetailsApiResponse } from "@/types/productTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const response = await fetchProductDetailsData(slug, locale);

  if (isApiError(response) || !(response as ProductDetailsApiResponse)?.data) {
    return {};
  }

  const product = (response as ProductDetailsApiResponse).data;

  return createEntityMetadata({
    locale,
    collection: "products",
    slug: product.slug,
    title: product.name,
    description: product.short_description || product.description,
    image: product.main_image,
    type: "website",
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const locale = await setupPageLocale(params);
  const { slug } = await params;
  const response = await fetchProductDetailsData(slug, locale);

  if (isApiError(response) || !(response as ProductDetailsApiResponse)?.data) {
    notFound();
  }

  return (
    <ProductDetails
      productData={(response as ProductDetailsApiResponse).data}
    />
  );
}
