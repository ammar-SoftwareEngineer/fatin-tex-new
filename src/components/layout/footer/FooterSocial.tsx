"use client";

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import type { SocialLink } from "@/types/layoutTypes";
import { transitionBase, transitionHover, viewportOnce } from "@/lib/motion";

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
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...transitionBase, delay: 0.18 }}
      viewport={viewportOnce}
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
              scale: 1.08,
              y: -2,
              backgroundColor: "#e0bc80",
              color: "#000",
              transition: transitionHover,
            }}
            whileTap={{ scale: 0.96 }}
            className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-lg"
          >
            <Icon />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
