"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import type { ProductCategory } from "@/types/productTypes";
import { getLocalizedSlug } from "@/lib/localized-slug";

type CategoriesPageProps = {
  categories?: ProductCategory[] | null;
};

export default function CategoriesPage({ categories }: CategoriesPageProps) {
  const locale = useLocale();
  const t = useTranslations("categories");
  const tNav = useTranslations("nav");
  const tBreadcrumb = useTranslations("breadcrumb");

  const items = (categories ?? []).filter(
    (category) => category.is_active !== false,
  );

  return (
    <section className="bg-[#0d0b09] text-white pb-28 overflow-hidden">
      <div className="bg-black/60 backdrop-blur-md border-b border-white/10">
        <Breadcrumb
          items={[
            { label: tBreadcrumb("home"), href: "/" },
            { label: tNav("categories"), href: "/categories" },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-20">
        {items.map((category, i) => {
          const slug = getLocalizedSlug(category.slug, locale);
          const href = slug
            ? `/products?category=${encodeURIComponent(slug)}`
            : "/products";

          return (
            <Link key={category.id} href={href}>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -14 }}
                className="group relative h-[420px] rounded-[34px] overflow-hidden"
              >
                <div className="absolute inset-0 overflow-hidden rounded-[34px]">
                  <Image
                    src={category.image || "/product1.jpg"}
                    alt={category.alt_image || category.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[#e0bc80] transition">
                    {category.name}
                  </h3>
                  {category.short_text ? (
                    <p className="text-gray-300 text-sm line-clamp-2 mb-5">
                      {category.short_text}
                    </p>
                  ) : null}
                  <div className="flex items-center gap-3 text-[#e0bc80] font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span>{t("viewProducts")}</span>
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
