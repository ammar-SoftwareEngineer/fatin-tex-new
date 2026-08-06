"use client";

/**
 * Image slider used on the About page.
 * Stretches to match the height of the story text column.
 */
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { transitionBase } from "@/lib/motion";
import type { ImageItem } from "@/types/aboutTypes";
import "swiper/css";
import "swiper/css/pagination";

type AboutImageSliderProps = {
  images: ImageItem[];
  alt: string;
};

export default function AboutImageSlider({ images, alt }: AboutImageSliderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={transitionBase}
      viewport={{ once: true, amount: 0.2 }}
      className="relative h-full min-h-[320px]"
    >
      <div className="relative h-full min-h-[320px] rounded-[30px] overflow-hidden border border-white/10 shadow-2xl">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={images.length > 1}
          className="about-image-swiper h-full w-full !absolute inset-0"
        >
          {images.map((item) => (
            <SwiperSlide key={item.id} className="!h-full">
              <div className="relative h-full w-full">
                <Image
                  src={item.url}
                  alt={alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Soft glow behind the slider */}
      <div className="absolute -bottom-8 -right-8 w-[200px] h-[200px] bg-[#e0bc80] blur-3xl opacity-20 rounded-full pointer-events-none" />
    </motion.div>
  );
}
