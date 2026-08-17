"use client";

/**
 * Product details page content.
 * Gallery, thumbnails (lightbox), description, and reels.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import ProductGallery from "@/components/products/details/ProductGallery";
import ProductThumbnails from "@/components/products/details/ProductThumbnails";
import ProductVideos from "@/components/products/details/ProductVideos";
import Container from "@/components/common/Container";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { ProductDetailsData } from "@/types/productTypes";
import { useTranslations } from "next-intl";
import { fadeUp, viewportOnce } from "@/lib/motion";

type ProductDetailsProps = {
  productData: ProductDetailsData;
};

export default function ProductDetails({ productData }: ProductDetailsProps) {
  const tNav = useTranslations("nav");
  const t = useTranslations("products");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

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

      <Container className="mt-16 space-y-20">
        <ProductGallery
          images={productData.images}
          productName={productData.name}
        />

        <ProductThumbnails
          images={productData.images}
          productName={productData.name}
          onOpen={openLightbox}
        />

        {/* Short description */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-[#e0bc80] mb-6">
            {t("aboutTitle")}
          </h2>
          <div
            className="text-gray-300 text-lg leading-9 text-center max-w-6xl mx-auto"
            dangerouslySetInnerHTML={{
              __html: productData.short_description,
            }}
          />
        </motion.div>

        <ProductVideos videos={productData.videos} />
      </Container>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={productData.images?.map((img) => ({ src: img.url }))}
      />
    </section>
  );
}
