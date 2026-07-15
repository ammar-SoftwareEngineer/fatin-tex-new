"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { localizePath } from "@/lib/utils";
import type { HomeSection } from "@/types/homeTypes";
import { ArrowRightIcon } from "lucide-react";

type SundusSectionProps = {
  sundus?: HomeSection;
};

export default function SundusSection({ sundus }: SundusSectionProps) {

  const params = useParams();
  const locale = typeof params.locale === "string" ? params.locale : undefined;

  return (
    <section className="relative min-h-screen bg-[#0d0b09] overflow-hidden">

      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-cover bg-center"
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 md:px-16 py-10 overflow-hidden">

        <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:block gap-10 overflow-hidden">

          {/* VIDEO BIG FOCUS */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="
              relative
              rounded-[24px] md:rounded-[40px]
              overflow-hidden
              shadow-2xl
              border border-white/10
            "
          >
            <iframe
              src={sundus?.button_link_url || "/vedio.mp4"}
              width="100%"
              height="100%"
              className="w-full h-[280px] sm:h-[380px] md:h-[520px] lg:h-[650px] object-cover"
              title="Sundus Video"
          allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
            ></iframe>

            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>

          {/* FLOATING GLASS CARD */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="
              w-full
              lg:absolute
              left-0
              lg:top-1/2
              lg:-translate-y-1/2
              lg:max-w-md
              h-full
            "
          >
            <div className="
              relative
              backdrop-blur-xl
              bg-white/5
              border border-white/10
              rounded-[28px] md:rounded-[40px]
              p-6 sm:p-8 md:p-11
              shadow-2xl
              overflow-hidden
            ">

              {/* Accent Line */}
              <div className="absolute left-0 top-0 h-full w-[2px] bg-[#e0bc80]" />

              {/* Logo */}
              <div className="mb-5 sm:mb-6">
                <img
                  src="/sondos.png"
                  alt="Sundus Logo"
                  className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(224,188,128,0.4)]"
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-playfair">
                {sundus?.title}
             
              </h2>

              {/* Decorative line */}
              <div className="flex items-center gap-3 my-5 sm:my-6">
                <div className="w-8 sm:w-12 h-[2px] bg-[#e0bc80]"></div>
                <div className="w-2 h-2 bg-[#e0bc80] rounded-full"></div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md" dangerouslySetInnerHTML={{ __html: sundus?.text || "" }}>
            
  
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">

                <Link href={localizePath(`/sondos-dyeing`, locale)}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 0px 25px rgba(224,188,128,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      bg-[#e0bc80]
                      text-black
                      px-5 sm:px-6
                      py-2.5 sm:py-3
                      rounded-full
                      font-medium
                      text-sm sm:text-base
                      flex items-center justify-center text-center gap-2
                    "
                  >
                    Explore Collection
                    <div className="
                  w-9 h-9 sm:w-10 sm:h-10
                  flex items-center justify-center
                  border border-black
                  text-black
                  rounded-full
                  cursor-pointer
                    hover:bg-black
                  hover:text-white
                  transition
                ">
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
                  </motion.div>
                </Link>

                

              </div>

              {/* Glow */}
              <div className="absolute -bottom-10 -right-10 w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] bg-[#e0bc80] blur-3xl opacity-10 rounded-full"></div>

            </div>
          </motion.div>

          {/* SMALL TEXT */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 0.15 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="absolute right-6 bottom-10 hidden lg:block"
          >
            <h1 className="text-[80px] xl:text-[120px] font-bold tracking-[10px] xl:tracking-[20px] text-white">
              SUNDUS
            </h1>
          </motion.div>

        </div>
      </div>
    </section>
  );
}