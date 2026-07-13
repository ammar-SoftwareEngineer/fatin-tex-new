import { fetchLayoutData } from "@/api/layoutService";
import { fetchCategoriesData } from "@/api/categoriesService";
import { getLocale } from "next-intl/server";
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
    : ((categoriesResponse as { data?: ProductCategory[] }).data ?? []).filter(
        (category) => category.show_in_navbar,
      );

  return (
    <NavbarContent
      layoutData={layoutData}
      navbarCategories={navbarCategories}
      locale={locale}
    />
  );
}
