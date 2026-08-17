import { createPageMetadata, setupPageLocale } from "@/lib/seo";
import CategoriesPage from "@/components/categories/CategoriesPage";
import { fetchCategoriesData } from "@/api/categoriesService";
import { isApiError } from "@/types/layoutTypes";
import type { CategoriesApiResponse } from "@/types/productTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createPageMetadata(params, "categories");
}

export default async function Categories({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await setupPageLocale(params);
  const categoriesResponse = await fetchCategoriesData(locale);

  return (
    <CategoriesPage
      categories={
        isApiError(categoriesResponse)
          ? null
          : (categoriesResponse as CategoriesApiResponse).data
      }
    />
  );
}
