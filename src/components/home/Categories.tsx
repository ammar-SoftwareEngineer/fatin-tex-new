"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocalizedSlug } from "@/lib/localized-slug";
import {
  staggerContainer,
  staggerItem,
  transitionBase,
  transitionHover,
  viewportOnce,
} from "@/lib/motion";
import "swiper/css";
import type { CategoriesSection } from "@/types/homeTypes";

type CategoriesProps = {
  categories?: CategoriesSection;
};

export default function Categories({ categories }: CategoriesProps) {
  const categoriesData = categories?.categories;
  const t = useTranslations("home.categories");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState(0);

  const titleWords =
    categories?.title?.trim().split(/\s+/).filter(Boolean) ?? [];
  const titleStart = titleWords.slice(0, -1).join(" ");
  const titleHighlight = titleWords.at(-1) ?? "";
  const activeProducts = categoriesData?.[activeTab]?.products ?? [];

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-16 bg-[#0d0b09] text-white overflow-hidden">
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
        className="flex justify-center gap-3 flex-wrap mb-12"
      >
        {categoriesData?.map((tab, i) => (
          <motion.button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(i)}
            whileHover={{ y: -3, transition: transitionHover }}
            whileTap={{ scale: 0.98 }}
            className={`px-6 py-2.5 rounded-full border text-sm sm:text-base transition-all duration-500 capitalize cursor-pointer ${
              activeTab === i
                ? "bg-[#e0bc80] text-black border-[#e0bc80]"
                : "border-white/10 bg-white/[0.03] hover:border-[#e0bc80]/40"
            }`}
          >
            {tab.name}
          </motion.button>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto">
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
              loop={activeProducts.length > 3}
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
              {activeProducts.map((item, i) => (
                <SwiperSlide key={`${activeTab}-${item.id}`}>
                  <Link
                    href={`/products/${getLocalizedSlug(item.slug, locale)}`}
                    className="block"
                  >
                    <div
                      className="categories-card-in categories-card-hover group relative h-[420px] rounded-[34px] overflow-hidden"
                      style={{ animationDelay: `${Math.min(i, 6) * 90}ms` }}
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-[34px]">
                        <Image
                          src={item.main_image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-7 z-10">
                        <span className="block text-gray-300 text-sm sm:text-base mb-3">
                          {categoriesData?.[activeTab]?.name}
                        </span>
                        <h3 className="text-2xl font-bold mb-3 transition-colors duration-500 group-hover:text-[#e0bc80]">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-3 text-[#e0bc80] font-medium opacity-0 translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                          <span>{t("viewMore")}</span>
                          <ArrowRight
                            size={18}
                            className="transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>
      </div>

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
    </section>
  );
}
