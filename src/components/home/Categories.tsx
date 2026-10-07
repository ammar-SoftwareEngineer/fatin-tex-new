"use client";

/**
 * Home page Categories section.
 * Shows category tabs and a product swiper for the active tab.
 */
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocalizedSlug } from "@/lib/localized-slug";
import type { LocalizedSlug } from "@/lib/localized-slug";
import CategoryTabs from "@/components/categories/CategoryTabs";
import ProductCard from "@/components/products/ProductCard";
import Container from "@/components/common/Container";
import {
  staggerContainer,
  staggerItem,
  transitionBase,
  transitionHover,
  viewportOnce,
} from "@/lib/motion";
import { splitTitleHighlight } from "@/lib/utils";
import type { CategoriesSection } from "@/types/homeTypes";
import "swiper/css";

type CategoriesProps = {
  categories?: CategoriesSection;
};

type Slide = {
  id: number;
  name: string;
  image: string;
  slug: LocalizedSlug;
  href?: string;
  ctaLabel: string;
};

export default function Categories({ categories }: CategoriesProps) {
  const categoriesData = categories?.categories;
  const t = useTranslations("home.categories");
  const tCategories = useTranslations("categories");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState(0);

  const { start: titleStart, highlight: titleHighlight } = splitTitleHighlight(
    categories?.title,
  );
  const activeCategory = categoriesData?.[activeTab];
  const activeProducts = activeCategory?.products ?? [];

  // Parent categories carry no products; show their sub-categories instead.
  const slides: Slide[] = activeProducts.length
    ? activeProducts.map((product) => ({
        id: product.id,
        name: product.name,
        image: product.main_image,
        slug: product.slug,
        ctaLabel: t("viewMore"),
      }))
    : (activeCategory?.children ?? []).map((child) => {
        const slug = getLocalizedSlug(child.slug, locale);
        return {
          id: child.id,
          name: child.name,
          image: child.image,
          slug: child.slug,
          href: slug
            ? `/products?category=${encodeURIComponent(slug)}`
            : "/categories",
          ctaLabel: tCategories("viewProducts"),
        };
      });

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-[#0d0b09] text-white overflow-hidden">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.p
            variants={staggerItem}
            className="text-[#e0bc80] uppercase text-xs sm:text-sm mb-4 tracking-[4px]"
          >
            {categories?.sub_title || t("subtitle")}
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold"
          >
            {titleStart}{" "}
            {titleHighlight ? (
              <span className="text-[#e0bc80]">{titleHighlight}</span>
            ) : null}
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transitionBase}
          viewport={viewportOnce}
        >
          <CategoryTabs
            tabs={categoriesData}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Swiper
              key={`categories-swiper-${activeTab}`}
              modules={[Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={slides.length > 3}
              spaceBetween={24}
              speed={700}
              breakpoints={{
                0: { slidesPerView: 1.1 },
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              className="categories-swiper"
            >
              {slides.map((item, i) => (
                <SwiperSlide key={`${activeTab}-${item.id}`}>
                  <ProductCard
                    name={item.name}
                    image={item.image}
                    slug={item.slug}
                    href={item.href}
                    categoryLabel={activeCategory?.name}
                    ctaLabel={item.ctaLabel}
                    index={i}
                    showArrow
                    className="categories-card-in categories-card-hover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transitionBase}
          viewport={viewportOnce}
          className="flex justify-center mt-14 sm:mt-16"
        >
          <Link href={categories?.button_link_url || "/products"}>
            <motion.div
              whileHover={{ scale: 1.04, y: -2, transition: transitionHover }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#e0bc80] text-black px-10 py-4 rounded-full font-semibold shadow-xl inline-block text-center"
            >
              {categories?.button_text || t("viewMore")}
            </motion.div>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
