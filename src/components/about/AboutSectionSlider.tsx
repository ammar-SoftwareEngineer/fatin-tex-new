"use client";

/**
 * Image slider for the home About section.
 * Stretches to match the height of the text column on large screens.
 */
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { fadeLeft, viewportOnce } from "@/lib/motion";
import type { ImageItem } from "@/types/aboutTypes";
import "swiper/css";
import "swiper/css/pagination";

type AboutSectionSliderProps = {
  images: ImageItem[];
  alt: string;
};

export default function AboutSectionSlider({
  images,
  alt,
}: AboutSectionSliderProps) {
  const t = useTranslations("home.aboutSection");

  return (
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="relative h-full min-h-[320px] sm:min-h-[420px]"
    >
      <div className="absolute -top-4 -left-4 w-full h-full border border-[#e0bc80]/20 rounded-[35px] pointer-events-none" />

      <div className="relative h-full min-h-[320px] sm:min-h-[420px] rounded-[30px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)] group">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={images.length > 1}
          className="h-full w-full !absolute inset-0"
        >
          {images.map((item) => (
            <SwiperSlide key={item.id} className="!h-full">
              <div className="relative h-full w-full">
                <Image
                  src={item.url}
                  alt={alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl px-5 sm:px-6 py-4 shadow-2xl">
          <h4 className="text-[#e0bc80] text-xl font-bold mb-1">
            {t("cardTitle")}
          </h4>
          <p className="text-gray-300 text-sm">{t("cardDesc")}</p>
        </div>
      </div>
    </motion.div>
  );
}
