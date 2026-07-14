"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import type { Product } from "@/types/productTypes";
import {
  getLocalizedSlug,
  matchesLocalizedSlug,
} from "@/lib/localized-slug";

type ProductsPageProps = {
  productsData?: Product[] | null;
  categorySlug?: string | null;
};

export default function ProductsPage({
  productsData,
  categorySlug,
}: ProductsPageProps) {
  const locale = useLocale();
  const t = useTranslations("products");
  const tNav = useTranslations("nav");
  const tBreadcrumb = useTranslations("breadcrumb");

  const products = (productsData ?? []).filter((product) => {
    if (!categorySlug) return true;
    return matchesLocalizedSlug(product.category?.slug, categorySlug);
  });

  return (
    <section className="bg-[#0d0b09] text-white pb-28 overflow-hidden">
      <div className="bg-black/60 backdrop-blur-md border-b border-white/10">
        <Breadcrumb
          items={[
            { label: tBreadcrumb("home"), href: "/" },
            { label: tNav("products"), href: "/products" },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8 pt-24">
        {products.map((product, i) => {
          const slug = getLocalizedSlug(product.slug, locale);

          return (
            <Link
              key={product.id}
              href={`/products/${slug}`}
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -14 }}
                className="group relative h-[420px] rounded-[34px] overflow-hidden"
              >
                <div className="absolute inset-0 overflow-hidden rounded-[34px]">
                  <Image
                    src={product.main_image || "/product1.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                  <p className="text-[#e0bc80] text-xs tracking-[4px] uppercase mb-2">
                    {product.category?.name}
                  </p>
                  <h3 className="text-2xl font-bold mb-5 group-hover:text-[#e0bc80] transition">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-3 text-[#e0bc80] font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span>{t("viewDetails")}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
