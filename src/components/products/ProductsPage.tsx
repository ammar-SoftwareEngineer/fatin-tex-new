"use client";

/**
 * Products listing page with optional category filter.
 */
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import ProductCard from "@/components/products/ProductCard";
import Container from "@/components/common/Container";
import type { Product } from "@/types/productTypes";
import { matchesLocalizedSlug } from "@/lib/localized-slug";
import {
  cardHover,
  fadeUp,
  staggerDelay,
  transitionBase,
  viewportOnce,
} from "@/lib/motion";

type ProductsPageProps = {
  productsData?: Product[] | null;
  categorySlug?: string | null;
};

export default function ProductsPage({
  productsData,
  categorySlug,
}: ProductsPageProps) {
  const t = useTranslations("products");
  const tNav = useTranslations("nav");

  const products = (productsData ?? []).filter((product) => {
    if (!categorySlug) return true;
    return matchesLocalizedSlug(product.category?.slug, categorySlug);
  });

  return (
    <section className="bg-[#0d0b09] text-white pb-28 overflow-hidden">
      <div className="bg-black/60 backdrop-blur-md border-b border-white/10">
        <Breadcrumb items={[{ label: tNav("products") }]} />
      </div>

      <Container className="pt-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-playfair">
            {t("heroTitle")}{" "}
            <span className="text-[#e0bc80]">{t("heroTitleHighlight")}</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            {t("heroDescription")}
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...transitionBase, delay: staggerDelay(i) }}
              viewport={viewportOnce}
              whileHover={cardHover}
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4"
            >
              <ProductCard
                name={product.name}
                image={product.main_image}
                slug={product.slug}
                categoryLabel={product.category?.name}
                ctaLabel={t("viewDetails")}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
