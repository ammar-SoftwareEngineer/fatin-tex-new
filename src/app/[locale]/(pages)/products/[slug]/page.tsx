import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/details/ProductDetails";
import { fetchProductDetailsData } from "@/api/productsService";
import { fetchCategoryParents } from "@/api/categoriesService";
import { createEntityMetadata, setupPageLocale } from "@/lib/seo";
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
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
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

  const product = (response as ProductDetailsApiResponse).data;
  const parents = product.category
    ? await fetchCategoryParents(product.category.slug.en ?? "", locale)
    : null;
  const categories = product.category ? [...(parents ?? []), product.category] : [];

  return <ProductDetails productData={product} categories={categories} />;
}
