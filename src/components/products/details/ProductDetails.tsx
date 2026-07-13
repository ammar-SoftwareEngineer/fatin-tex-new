"use client";

import { useState } from "react";
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
import { ProductDetails } from "@/types/productTypes";

export default function ProductDetails( { productData }: { productData: ProductDetails } ) {
  console.log("productData", productData);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const product = {
    slug: "luxury-cotton-fabric",
    name: "Luxury Cotton Fabric",
    category: "Cotton",
    description:
      "Premium luxury cotton fabric crafted with precision to deliver an ultra-soft touch, breathable texture, and refined finishing.",
    longDescription:
      "This fabric is engineered for premium brands and designers who value both aesthetics and performance...",
    sliderImages: ["/product1.jpg", "/product2.jpg", "/product3.jpg"],
    gallery: ["/product1.jpg", "/product2.jpg", "/product3.jpg"],
    reels: ["/video.mp4", "/video.mp4", "/video.mp4"],
  };

  return (
    <section className="bg-[#0f0f0f] text-white pb-28 overflow-hidden">
      <div className="bg-black/60 backdrop-blur-md border-b border-white/10">
        <Breadcrumb
          items={[
            { label: "Products", href: "/products" },
            { label: productData.name, href: `/products/${productData.slug.en}` },
          ]}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-16 space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
                <div className="relative h-[700px]">
                  <Image src={img.url} alt={productData.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-gray-300 text-lg leading-9 text-center max-w-3xl mx-auto"
        >
          {product.description}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {product.gallery.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="rounded-2xl overflow-hidden cursor-pointer border border-white/10"
            >
              <Image
                src={img}
                alt=""
                width={400}
                height={400}
                className="h-[280px] w-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#e0bc80] mb-6">
            About This Fabric
          </h2>
          <p className="text-gray-400 leading-9 max-w-4xl mx-auto text-lg">
            {product.longDescription}
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-center mb-12">Product Reels</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {product.reels.map((video, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl overflow-hidden bg-black border border-white/10"
              >
                <video
                  className="w-full h-[420px] object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                >
                  <source src={video} type="video/mp4" />
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
          slides={product.gallery.map((img) => ({ src: img }))}
        />
      </AnimatePresence>
    </section>
  );
}
