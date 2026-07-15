"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { transitionBase, viewportOnce } from "@/lib/motion";

type FooterCopyrightProps = {
  copyright?: string | null;
};

export default function FooterCopyright({ copyright }: FooterCopyrightProps) {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ...transitionBase, delay: 0.28 }}
      viewport={viewportOnce}
      className="w-full border-t border-white/10 pt-6 text-center"
    >
      <p className="text-gray-500 text-xs sm:text-sm leading-6">
        {copyright || `© 2026 ${tCommon("brandName")}. ${t("rights")}`}{" "}
        <Link href="#" className="text-xs sm:text-sm leading-6">
          {t("developedBy")}{" "}
          <span className="font-bold text-[#e0bc80]">Be Group</span>
        </Link>
      </p>
    </motion.div>
  );
}
