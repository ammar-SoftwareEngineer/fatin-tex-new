"use client";

/**
 * Category details page: sub-categories + products of the category.
 */
import { useLocale, useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import CategoryCard from "@/components/categories/CategoryCard";
import ProductCard from "@/components/products/ProductCard";
import Container from "@/components/common/Container";
import { getLocalizedSlug } from "@/lib/localized-slug";
import type { CategoryDetails as Category, ProductCategory } from "@/types/productTypes";

type CategoryDetailsProps = {
  category: Category;
  parents: ProductCategory[];
};

export default function CategoryDetails({ category, parents }: CategoryDetailsProps) {
  const locale = useLocale();
  const t = useTranslations("categories");
  const tNav = useTranslations("nav");
  const tProducts = useTranslations("products");

  const children = category.children ?? [];
  const products = category.products ?? [];

  const breadcrumb = [
    { label: tNav("categories"), href: "/categories" },
    ...parents.map((parent) => ({
      label: parent.name,
      href: `/categories/${getLocalizedSlug(parent.slug, locale)}`,
    })),
    {
      label: category.name,
      image: category.image,
      description: category.short_text,
    },
  ];

  return (
    <section className="bg-[#0d0b09] text-white pb-28 overflow-hidden">
      <div className="bg-black/60 backdrop-blur-md border-b border-white/10">
        <Breadcrumb items={breadcrumb} />
      </div>

      <Container className="pt-20">
        {children.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {children.map((child, i) => (
              <CategoryCard key={child.id} category={child} index={i} />
            ))}
          </div>
        )}

        {products.length > 0 && (
          <>
            {/* <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-center mb-12">
              {t("productsTitle")}
            </h2> */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  image={product.main_image}
                  slug={product.slug}
                  categoryLabel={category.name}
                  ctaLabel={tProducts("viewDetails")}
                />
              ))}
            </div>
          </>
        )}

        {children.length === 0 && products.length === 0 && (
          <p className="text-center text-gray-400 py-12">{t("empty")}</p>
        )}
      </Container>
    </section>
  );
}
