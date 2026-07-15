"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type FooterBrandProps = {
  logo: string;
  description?: string;
};

export default function FooterBrand({ logo, description }: FooterBrandProps) {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <motion.img
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ type: "spring", stiffness: 200 }}
        src={logo}
        alt={tCommon("brandName")}
        className="h-24 sm:h-28 lg:h-32 mx-auto object-contain mb-4"
      />

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl sm:text-2xl font-semibold mb-2"
      >
        {tCommon("brandName")}
      </motion.h3>

      <p className="text-gray-300 text-sm sm:text-base max-w-md leading-7 whitespace-pre-line">
        {description || t("description")}
      </p>
    </motion.div>
  );
}
