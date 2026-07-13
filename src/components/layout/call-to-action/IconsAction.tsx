"use client";

import { motion } from "framer-motion";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import siteData from "@/lib/data/site.json";
import type { CallToAction } from "@/types/layoutTypes";

type IconsActionProps = {
  callToAction?: CallToAction | null;
};

export default function IconsAction({ callToAction }: IconsActionProps) {
  const phone = callToAction?.phone ?? siteData.contact.phone;
  const whatsapp = callToAction?.whatsapp ?? siteData.contact.phone.replace(/\D/g, "");

  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
    },
  };

  return (
    <>
      <motion.a
        href={`tel:${phone}`}
        animate={floatingAnimation}
        whileHover={{ scale: 1.12, rotate: 5 }}
        whileTap={{ scale: 0.92 }}
        className="
          group relative w-12 h-12 sm:w-14 sm:h-14
          flex items-center justify-center rounded-full overflow-hidden
          shadow-[0_10px_30px_rgba(224,188,128,0.35)]
        "
      >
        <span className="absolute inset-0 bg-gradient-to-br from-[#e0bc80] to-[#b2895d]" />
        <motion.span
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-[#e0bc80]"
        />
        <FaPhoneAlt className="relative z-10 text-white text-lg sm:text-2xl transition-transform duration-300 group-hover:scale-125" />
      </motion.a>

      <motion.a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 0.5 },
        }}
        whileHover={{ scale: 1.12, rotate: -5 }}
        whileTap={{ scale: 0.92 }}
        className="
          group relative w-12 h-12 sm:w-14 sm:h-14
          flex items-center justify-center rounded-full overflow-hidden
          shadow-[0_10px_30px_rgba(178,137,93,0.35)]
        "
      >
        <span className="absolute inset-0 bg-gradient-to-br from-[#b2895d] to-[#e0bc80]" />
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-[#e0bc80]"
        />
        <FaWhatsapp className="relative z-10 text-white text-[22px] sm:text-[28px] transition-transform duration-300 group-hover:scale-125" />
      </motion.a>
    </>
  );
}
