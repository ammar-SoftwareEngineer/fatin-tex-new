"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { ProductDetailsData } from "@/types/productTypes";
import { useTranslations } from "next-intl";
import { useSlugAlternates } from "@/components/i18n/SlugAlternatesProvider";
import {
  cardHover,
  fadeUp,
  staggerDelay,
  transitionBase,
  viewportOnce,
} from "@/lib/motion";

export default function ProductDetails({
  productData,
}: {
  productData: ProductDetailsData;
}) {
  const tNav = useTranslations("nav");
  const { setSlug } = useSlugAlternates();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setSlug(productData.slug);
    return () => setSlug(null);
  }, [productData.slug, setSlug]);

  return (
    <section className="bg-[#0f0f0f] text-white pb-28 overflow-hidden">
      <div className="bg-black/60 backdrop-blur-md border-b border-white/10">
        <Breadcrumb
          items={[
            { label: tNav("products"), href: "/products" },
            {
              label: productData.name,
              image: productData.main_image,
              description: productData.short_description,
            },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
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
            {productData.images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-[420px] sm:h-[560px] lg:h-[700px]">
                  <Image
                    src={img.url}
                    alt={`${productData.name} — ${i + 1}`}
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

      

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {productData?.images?.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...transitionBase, delay: staggerDelay(i) }}
              viewport={viewportOnce}
              whileHover={cardHover}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="rounded-2xl overflow-hidden cursor-pointer border border-white/10"
            >
              <Image
                src={img.url}
                alt={`${productData.name} thumbnail ${i + 1}`}
                width={400}
                height={400}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="h-[280px] w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-[#e0bc80] mb-6">
            About This Fabric
          </h2>
          <div
            className="text-gray-300 text-lg leading-9 text-center max-w-6xl mx-auto"
            dangerouslySetInnerHTML={{
              __html: productData.short_description,
            }}
          />
        </motion.div>

        <div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-4xl font-bold text-center mb-12"
          >
            Product Reels
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {productData?.videos?.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...transitionBase, delay: staggerDelay(i) }}
                viewport={viewportOnce}
                whileHover={cardHover}
                className="rounded-2xl overflow-hidden bg-black border border-white/10"
              >
                <video
                  className="w-full h-[420px] object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                >
                  <source src={video.url} type="video/mp4" />
                </video>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={productData?.images?.map((img) => ({ src: img.url }))}
        />
      </AnimatePresence>
    </section>
  );
}
