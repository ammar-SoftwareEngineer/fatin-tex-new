"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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
      transition={{ delay: 0.9 }}
      viewport={{ once: true }}
      className="w-full border-t border-white/10 pt-6 text-center"
    >
      <p className="text-gray-500 text-xs sm:text-sm leading-6">
        {copyright || `© 2026 ${tCommon("brandName")}. ${t("rights")}`}
      </p>
    </motion.div>
  );
}
