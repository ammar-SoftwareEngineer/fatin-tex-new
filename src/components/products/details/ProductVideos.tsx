"use client";

/**
 * Product reels / video grid on the product details page.
 */
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  cardHover,
  fadeUp,
  staggerDelay,
  transitionBase,
  viewportOnce,
} from "@/lib/motion";
import type { ProductVideo } from "@/types/productTypes";

type ProductVideosProps = {
  videos?: ProductVideo[];
};

export default function ProductVideos({ videos }: ProductVideosProps) {
  const t = useTranslations("products");

  if (!videos?.length) return null;

  return (
    <div>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="text-4xl font-bold text-center mb-12"
      >
        {t("reelsTitle")}
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {videos.map((video, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
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
  );
}
