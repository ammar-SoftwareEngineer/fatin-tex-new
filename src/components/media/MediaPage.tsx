"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { GalleryItem } from "@/lib/gallery";
import {
  cardHover,
  fadeUp,
  staggerDelay,
  transitionBase,
  viewportOnce,
} from "@/lib/motion";

type MediaType = "images" | "videos";

type MediaPageProps = {
  type?: MediaType;
  items?: GalleryItem[];
};

export default function MediaPage({
  type = "images",
  items = [],
}: MediaPageProps) {
  const t = useTranslations("media");
  const tNav = useTranslations("nav");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const isVideos = type === "videos";
  const titleKey = isVideos ? "videosTitle" : "imagesTitle";
  const highlightKey = isVideos ? "videosHighlight" : "imagesHighlight";
  const emptyKey = isVideos ? "emptyVideos" : "emptyImages";

  return (
    <section className="bg-[#0f0f0f] text-white pb-28">
      <div className="bg-black">
        <Breadcrumb
          items={[
            { label: tNav("gallery"), href: "/media" },
            {
              label: isVideos ? tNav("videos") : tNav("images"),
            },
          ]}
        />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="text-center py-16 px-6"
      >
        <p className="text-[#e0bc80] tracking-[5px] uppercase text-xs mb-4">
          {t("subtitle")}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold">
          {t(titleKey)}{" "}
          <span className="text-[#e0bc80]">{t(highlightKey)}</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{t("description")}</p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/media/images"
            className={`px-6 py-2.5 rounded-full border text-sm transition ${
              !isVideos
                ? "bg-[#e0bc80] text-black border-[#e0bc80]"
                : "border-white/20 text-white hover:border-[#e0bc80]"
            }`}
          >
            {tNav("images")}
          </Link>
          <Link
            href="/media/videos"
            className={`px-6 py-2.5 rounded-full border text-sm transition ${
              isVideos
                ? "bg-[#e0bc80] text-black border-[#e0bc80]"
                : "border-white/20 text-white hover:border-[#e0bc80]"
            }`}
          >
            {tNav("videos")}
          </Link>
        </div>
      </motion.div>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 px-6">{t(emptyKey)}</p>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {items.map((item, i) =>
            isVideos ? (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...transitionBase, delay: staggerDelay(i) }}
                viewport={viewportOnce}
                whileHover={cardHover}
                onClick={() => setActiveVideo(item.url)}
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
        </div>
      )}

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.video
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={activeVideo}
              controls
              autoPlay
              className="max-w-4xl w-full rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
