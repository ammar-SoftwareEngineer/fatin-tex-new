import { notFound } from "next/navigation";
import CategoryDetails from "@/components/categories/CategoryDetails";
import {
  fetchCategoryDetailsData,
  fetchCategoryParents,
} from "@/api/categoriesService";
import { createEntityMetadata, setupPageLocale } from "@/lib/seo";
import { findSlugInLocale } from "@/lib/locale-fallback";
import { redirect } from "@/i18n/navigation";
import type { CategoryDetailsApiResponse } from "@/types/productTypes";

type Props = { params: Promise<{ locale: string; slug: string }> };

async function getCategory(slug: string, locale: string) {
  const response = await fetchCategoryDetailsData(slug, locale);
  return (response as CategoryDetailsApiResponse)?.data ?? null;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const category = await getCategory(slug, locale);

  if (!category) {
    return { title: "Category Not Found", robots: { index: false, follow: false } };
  }

  return createEntityMetadata({
    locale,
    collection: "categories",
    slug: category.slug,
    title: category.name,
    description: category.short_text,
    image: category.image,
  });
}

export default async function CategoryDetailPage({ params }: Props) {
  const locale = await setupPageLocale(params);
  const { slug } = await params;

  const [category, parents] = await Promise.all([
    getCategory(slug, locale),
    fetchCategoryParents(slug, locale),
  ]);

  if (!category) {
    const localized = await findSlugInLocale(slug, locale, fetchCategoryDetailsData);
    if (localized) redirect({ href: `/categories/${localized}`, locale });
    notFound();
  }

  return <CategoryDetails category={category} parents={parents ?? []} />;
}
