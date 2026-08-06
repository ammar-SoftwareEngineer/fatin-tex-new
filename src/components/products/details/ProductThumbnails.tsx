"use client";

/**
 * Clickable product thumbnails that open the lightbox.
 */
import Image from "next/image";
import { motion } from "framer-motion";
import { cardHover, staggerDelay, transitionBase, viewportOnce } from "@/lib/motion";
import type { ProductImage } from "@/types/productTypes";

type ProductThumbnailsProps = {
  images: ProductImage[];
  productName: string;
  onOpen: (index: number) => void;
};

export default function ProductThumbnails({
  images,
  productName,
  onOpen,
}: ProductThumbnailsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...transitionBase, delay: staggerDelay(i) }}
          viewport={viewportOnce}
          whileHover={cardHover}
          onClick={() => onOpen(i)}
          className="rounded-2xl overflow-hidden cursor-pointer border border-white/10"
        >
          <Image
            src={img.url}
            alt={`${productName} thumbnail ${i + 1}`}
            width={400}
            height={400}
            sizes="(max-width: 640px) 100vw, 33vw"
            className="h-[280px] w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  );
}
