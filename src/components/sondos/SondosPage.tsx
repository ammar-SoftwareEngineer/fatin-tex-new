"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import VideoSection from "@/components/home/VideoSection";

export default function SondosPage() {
  const t = useTranslations("sondos.page");

  return (
    <div className="bg-(--background) text-white overflow-hidden">
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/sondos.png')" }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#e0bc80] tracking-[6px] text-xs mb-4"
          >
            {t("heroSubtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold font-playfair leading-tight"
          >
            {t("heroTitle")}{" "}
            <span className="text-[#e0bc80]">{t("heroTitleHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-300 mt-6 max-w-2xl leading-relaxed"
          >
            {t("heroDescription")}
          </motion.p>
          <Link href="/contact">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-8 px-6 py-3 rounded-full bg-[#e0bc80] text-black font-medium inline-block text-center"
            >
              {t("exploreProcess")}
            </motion.div>
          </Link>
        </div>
      </section>

      <section className="px-6 md:px-16 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#e0bc80] tracking-[6px] text-xs mb-4"
          >
            {t("sectionSubtitle")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-playfair"
          >
            {t("sectionTitle")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-300 mt-6 leading-relaxed"
          >
            {t("sectionDescription")}
          </motion.p>
        </div>

        <section className="w-full mt-20">
          <div className="relative w-full overflow-hidden border-y border-white/10">
            <div className="w-full h-[500px] md:h-[650px] relative">
              <VideoSection />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/40" />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
