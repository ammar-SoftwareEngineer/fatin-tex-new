"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiHome } from "react-icons/hi2";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const t = useTranslations("breadcrumb");

  return (
    <section className="relative overflow-hidden pt-36 sm:pt-44 lg:pt-52 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-16">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero2.jpg')" }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19]/95 via-black/40 to-[#0b0f19]/80" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-playfair text-white leading-tight mb-5"
        >
          {items[items.length - 1]?.label}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl leading-7 mb-8"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.01 }}
          className="inline-flex items-center flex-wrap gap-2 sm:gap-3 bg-white/10 border border-white/10 backdrop-blur-2xl px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-sm sm:text-base text-gray-200 hover:text-[#e0bc80] transition-all duration-300"
          >
            <HiHome className="text-lg" />
            <span>{t("home")}</span>
          </Link>

          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <MdKeyboardArrowRight className="text-gray-400 text-lg" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-sm sm:text-base text-gray-200 hover:text-[#e0bc80] transition-all duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm sm:text-base text-[#e0bc80] font-semibold">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
