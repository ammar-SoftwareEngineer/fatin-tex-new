"use client";

/**
 * Category card used on the categories listing page.
 * Links to the products page filtered by this category.
 */
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocalizedSlug } from "@/lib/localized-slug";
import {
  cardHover,
  staggerDelay,
  transitionBase,
  viewportOnce,
} from "@/lib/motion";
import type { ProductCategory } from "@/types/productTypes";

type CategoryCardProps = {
  category: ProductCategory;
  index?: number;
};

export default function CategoryCard({
  category,
  index = 0,
}: CategoryCardProps) {
  const locale = useLocale();
  const t = useTranslations("categories");

  const slug = getLocalizedSlug(category.slug, locale);
  const href = slug
    ? `/products?category=${encodeURIComponent(slug)}`
    : "/products";

  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ...transitionBase, delay: staggerDelay(index) }}
        viewport={viewportOnce}
        whileHover={cardHover}
        className="group relative h-[420px] rounded-[34px] overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[34px]">
          <Image
            src={category.image || "/product1.jpg"}
            alt={category.alt_image || category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
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
}
