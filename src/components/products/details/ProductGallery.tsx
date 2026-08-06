"use client";

/**
 * Main product image gallery (swiper with navigation).
 */
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { transitionBase, viewportOnce } from "@/lib/motion";
import type { ProductImage } from "@/types/productTypes";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={transitionBase}
      viewport={viewportOnce}
      className="relative rounded-[35px] overflow-hidden shadow-2xl border border-white/10"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        spaceBetween={20}
        slidesPerView={1}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-[420px] sm:h-[560px] lg:h-[700px]">
              <Image
                src={img.url}
                alt={`${productName} — ${i + 1}`}
                sizes="100vw"
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
