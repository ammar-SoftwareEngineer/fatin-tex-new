"use client";

/**
 * Grid of gallery images or video thumbnails.
 */
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cardHover, staggerDelay, transitionBase, viewportOnce } from "@/lib/motion";
import Container from "@/components/common/Container";
import type { GalleryItem } from "./mediaTypes";

type MediaGridProps = {
  items: GalleryItem[];
  isVideos: boolean;
  onPlayVideo: (url: string) => void;
};

export default function MediaGrid({
  items,
  isVideos,
  onPlayVideo,
}: MediaGridProps) {
  const t = useTranslations("media");
  const list = Array.isArray(items) ? items : [];

  return (
    <Container className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {list.map((item, i) =>
        isVideos ? (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...transitionBase, delay: staggerDelay(i) }}
            viewport={viewportOnce}
            whileHover={cardHover}
            onClick={() => onPlayVideo(item.url)}
            className="cursor-pointer rounded-2xl overflow-hidden bg-black group relative text-left"
          >
            <Image
              src={item.thumbnail || "/product1.jpg"}
              alt={item.title || t("playVideo")}
              width={600}
              height={400}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div className="px-4 py-2 bg-[#e0bc80] text-black rounded-full font-medium">
                {t("playVideo")}
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...transitionBase, delay: staggerDelay(i) }}
            viewport={viewportOnce}
            whileHover={cardHover}
            className="rounded-2xl overflow-hidden bg-black group relative"
          >
            <Image
              src={item.url}
              alt={item.title || t("imagesTitle")}
              width={600}
              height={400}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-500"
              loading="lazy"
            />
          </motion.div>
        ),
      )}
    </Container>
  );
}
