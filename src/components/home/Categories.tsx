"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import "swiper/css";
import type { CategoriesSection } from "@/types/homeTypes";



type CategoriesProps = {
  categories?: CategoriesSection;
};

export default function Categories({ categories }: CategoriesProps) {
  const categoriesData = categories?.categories;
  const t = useTranslations("home.categories");
  const tCommon = useTranslations("common");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-16 bg-[#0d0b09] text-white overflow-hidden">
      <div className="text-center mb-12 sm:mb-16">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0px" }}
          whileInView={{ opacity: 1, letterSpacing: "4px" }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-[#e0bc80] uppercase text-xs sm:text-sm mb-4"
        >
          {categories?.sub_title || t("subtitle")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-6xl font-bold"
        >
          {categories?.title.split(" ")[0]} <span className="text-[#e0bc80]">{categories?.title.split(" ")[1]}</span>
        </motion.h2>
      </div>

      <div className="flex justify-center gap-3 flex-wrap mb-12">
        {categoriesData?.map((tab, i) => (
          <motion.button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(i)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2.5 rounded-full border text-sm sm:text-base transition-all duration-300 capitalize cursor-pointer ${
              activeTab === i
                ? "bg-[#e0bc80] text-black border-[#e0bc80]"
                : "border-white/10 bg-white/[0.03] hover:border-[#e0bc80]/40"
            }`}
          >
            {tab.name}
          </motion.button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.7 }}
          >
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop
              spaceBetween={24}
              breakpoints={{
                0: { slidesPerView: 1.1 },
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
            >
              {categoriesData?.[activeTab]?.products.map((item, i) => (
                <SwiperSlide key={item.id}>
                  <Link
                    href={`/products/${item.slug.en}`}
                    className="block"
                  >
                    <motion.div
                      whileHover={{ y: -14 }}
                      className="group relative h-[420px] rounded-[34px] overflow-hidden"
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-[34px]">
                        <img
                          src={item.main_image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-7 z-10">
                        <span className="text-gray-300 text-sm sm:text-base mb-6">
                         {categoriesData?.[activeTab]?.name}
                        </span>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-[#e0bc80] transition">
                          {item.name}
                        </h3>
                        
                      
                        <div className="flex items-center gap-3 text-[#e0bc80] font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                          <span>{t("viewMore")}</span>
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-14 sm:mt-16">
        <Link href={categories?.button_link_url || ""}>
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#e0bc80] text-black px-10 py-4 rounded-full font-semibold shadow-xl inline-block text-center"
          >
            {categories?.button_text || t("viewMore")}
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
