import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ProductDetails from "@/components/products/details/ProductDetails";
import JsonLd from "@/components/seo/JsonLd";
import { fetchLayoutData } from "@/api/layoutService";
import { fetchProductDetailsData } from "@/api/productsService";
import { createEntityMetadata } from "@/lib/seo/entity-metadata";
import {
  buildBreadcrumbJsonLd,
  buildProductJsonLd,
} from "@/lib/seo/json-ld";
import { getLocalizedSlug } from "@/lib/localized-slug";
import { localeUrl } from "@/lib/seo/site";
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
  const [response, layoutData, tNav] = await Promise.all([
    fetchProductDetailsData(slug, locale),
    fetchLayoutData(locale),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  if (isApiError(response) || !(response as ProductDetailsApiResponse)?.data) {
    notFound();
  }

  const product = (response as ProductDetailsApiResponse).data;
  const siteName = !isApiError(layoutData)
    ? layoutData.data?.branding?.site_name
    : undefined;
  const productSlug = getLocalizedSlug(product.slug, locale);

  return (
    <>
      <JsonLd data={buildProductJsonLd(locale, product, siteName)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: tNav("home"), url: localeUrl(locale) },
          { name: tNav("products"), url: localeUrl(locale, "/products") },
          {
            name: product.name,
            url: localeUrl(locale, `/products/${productSlug}`),
          },
        ])}
      />
      <ProductDetails productData={product} />
    </>
  );
}
