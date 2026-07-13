"use client";

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import type { SocialLink } from "@/types/layoutTypes";

const platformIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
} as const;

type FooterSocialProps = {
  socialLinks: SocialLink[];
};

export default function FooterSocial({ socialLinks }: FooterSocialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      viewport={{ once: true }}
      className="flex justify-center gap-4 sm:gap-5 mb-10"
    >
      {socialLinks.map((link) => {
        const Icon =
          platformIcons[link.platform as keyof typeof platformIcons];

        if (!Icon) return null;

        return (
          <motion.a
            key={`${link.platform}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.15,
              rotate: 8,
              backgroundColor: "#e0bc80",
              color: "#000",
              boxShadow: "0 10px 30px rgba(224,188,128,0.35)",
            }}
            whileTap={{ scale: 0.92 }}
            className="
              w-11 h-11 sm:w-12 sm:h-12
              flex items-center justify-center
              rounded-full border border-white/10
              bg-white/5 backdrop-blur-xl text-lg
              transition-all duration-300
            "
          >
            <Icon />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
