"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { FooterLinkItem } from "./types";
import { transitionBase, transitionHover, viewportOnce } from "@/lib/motion";

export default function FooterLinks({ links }: { links: FooterLinkItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...transitionBase, delay: 0.12 }}
      viewport={viewportOnce}
      className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10"
    >
      {links.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{
            scale: 1.04,
            y: -3,
            backgroundColor: "#e0bc80",
            color: "#000",
            transition: transitionHover,
          }}
          className="rounded-full border border-white/10 bg-white/5"
        >
          <Link href={item.href} className="block px-5 py-2.5 text-gray-300">
            {item.name}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
