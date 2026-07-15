"use client";

import { motion } from "framer-motion";
import type { HomeSection } from "@/types/homeTypes";
import Image from "next/image";
import {
  cardHover,
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/motion";
import "../../styles/globals.css";

type WhyChooseUsProps = {
  whyChooseUs?: HomeSection;
};

export default function WhyChooseUs({ whyChooseUs }: WhyChooseUsProps) {
  const titleWords =
    whyChooseUs?.title?.trim().split(/\s+/).filter(Boolean) ?? [];
  const titleStart = titleWords.slice(0, -1).join(" ");
  const titleHighlight = titleWords.at(-1) ?? "";

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-16 bg-[#0d0b09] overflow-hidden text-white">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
      >
        <p className="text-[#e0bc80] tracking-[4px] sm:tracking-[5px] text-[10px] sm:text-xs mb-4">
          {whyChooseUs?.sub_title}
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-playfair leading-tight">
          {titleStart}{" "}
          {titleHighlight ? (
            <span className="text-[#e0bc80]">{titleHighlight}</span>
          ) : null}
        </h2>
        <p
          className="text-gray-400 mt-5 sm:mt-6 leading-relaxed text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: whyChooseUs?.text ?? "" }}
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto"
      >
        {whyChooseUs?.benefits?.map((item, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            whileHover={cardHover}
            className="group relative overflow-hidden rounded-[24px] sm:rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-[#e0bc80]/10 to-transparent" />
            <div  className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#e0bc80]/10 border border-[#e0bc80]/20 flex items-center justify-center text-[#e0bc80] mb-5 sm:mb-6" >
              <Image src={item.image} alt={item.title} width={40} height={40} className="icon-image"/>
            </div>
            <h3 className="relative z-10 text-xl sm:text-2xl font-bold font-playfair mb-3 sm:mb-4">
              {item.title}
            </h3>
            <p className="relative z-10 text-gray-400 text-sm sm:text-base leading-relaxed">
              {item.sub_title}
            </p>
            <span className="absolute top-4 sm:top-6 right-4 sm:right-6 text-4xl sm:text-5xl font-bold text-white/5">
              0{item.order}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
