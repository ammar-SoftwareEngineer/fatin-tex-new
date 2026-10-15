import { Suspense } from "react";
import { getLocale } from "next-intl/server";
import { fetchLayoutData } from "@/api/layoutService";
import {
  fetchCategoriesData,
  fetchNavbarCategoryTree,
} from "@/api/categoriesService";
import { isApiError } from "@/types/layoutTypes";
import type { ProductCategory } from "@/types/productTypes";
import NavbarContent from "./NavbarContent";

export default async function Navbar() {
  const locale = await getLocale();
  const [layoutData, categoriesResponse] = await Promise.all([
    fetchLayoutData(locale),
    fetchCategoriesData(locale),
  ]);

  const navbarCategories = isApiError(categoriesResponse)
    ? []
    : await fetchNavbarCategoryTree(
        ((categoriesResponse as { data?: ProductCategory[] }).data ?? []).filter(
          (category) => category.show_in_navbar,
        ),
        locale,
      );

  return (
    <Suspense fallback={null}>
      <NavbarContent
        layoutData={layoutData}
        navbarCategories={navbarCategories}
      />
    </Suspense>
  );
}
