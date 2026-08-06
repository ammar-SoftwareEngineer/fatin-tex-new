"use client";

/**
 * Categories listing page grid.
 */
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import CategoryCard from "@/components/categories/CategoryCard";
import Container from "@/components/common/Container";
import type { ProductCategory } from "@/types/productTypes";
import { fadeUp, viewportOnce } from "@/lib/motion";

type CategoriesPageProps = {
  categories?: ProductCategory[] | null;
};

export default function CategoriesPage({ categories }: CategoriesPageProps) {
  const t = useTranslations("categories");
  const tNav = useTranslations("nav");

  const items = (categories ?? []).filter(
    (category) => category.is_active !== false,
  );

  return (
    <section className="bg-[#0d0b09] text-white pb-28 overflow-hidden">
      <div className="bg-black/60 backdrop-blur-md border-b border-white/10">
        <Breadcrumb items={[{ label: tNav("categories") }]} />
      </div>

      <Container className="pt-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-playfair">
            {t("title")}{" "}
            <span className="text-[#e0bc80]">{t("titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
