"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function MediaPage() {
  const t = useTranslations("media");
  const tNav = useTranslations("nav");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videos = Array(6).fill("/vedio.mp4");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="bg-[#0f0f0f] text-white pb-28">
      <div className="bg-black">
        <Breadcrumb items={[{ label: tNav("media"), href: "/media" }]} />
      </div>

      <div className="text-center py-16 px-6">
        <p className="text-[#e0bc80] tracking-[5px] uppercase text-xs mb-4">{t("subtitle")}</p>
        <h1 className="text-4xl md:text-5xl font-bold">
          {t("title")} <span className="text-[#e0bc80]">{t("titleHighlight")}</span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{t("description")}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {videos.map((video, i) => (
          <div
            key={i}
            onClick={() => setActiveVideo(video)}
            className="cursor-pointer rounded-2xl overflow-hidden bg-black group relative"
          >
            <img
              src="/product1.jpg"
              alt="video preview"
              loading="lazy"
              className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div className="px-4 py-2 bg-[#e0bc80] text-black rounded-full font-medium">▶ Play Video</div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-6"
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
