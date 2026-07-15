"use client";

import { motion } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import type { FooterContactInfo } from "./types";
import { useLocale } from "next-intl";
import { cardHover, transitionBase, viewportOnce } from "@/lib/motion";

type FooterContactProps = {
  contact: FooterContactInfo;
};

const contactItems = [
  {
    key: "address" as const,
    icon: HiOutlineLocationMarker,
    label: "Address",
    labelAr: "العنوان",
  },
  {
    key: "phone" as const,
    icon: HiOutlinePhone,
    label: "Phone",
    labelAr: "الهاتف",
  },
  {
    key: "email" as const,
    icon: HiOutlineMail,
    label: "Email",
    labelAr: "البريد الإلكتروني",
  },
];

export default function FooterContact({ contact }: FooterContactProps) {
  const locale = useLocale();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...transitionBase, delay: 0.22 }}
      viewport={viewportOnce}
      className="grid grid-cols-12 gap-5 w-full mb-12"
    >
      {contactItems.map((item) => {
        const Icon = item.icon;
        const value = contact[item.key];

        return (
          <motion.div
            key={item.key}
            whileHover={cardHover}
            className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl px-5 py-5 col-span-12 md:col-span-4"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#e0bc80]/15 text-[#e0bc80] text-2xl shrink-0">
              <Icon />
            </div>
            <div>
              <p
                className={`text-sm text-gray-400 mb-2 ${locale === "ar" ? "text-right" : "text-left"}`}
              >
                {locale === "ar" ? item.labelAr : item.label}
              </p>
              <h4
                className={`font-medium ltr ${item.key === "email" ? "break-all" : ""} ${locale === "ar" ? "text-right" : "text-left"}`}
              >
                {value}
              </h4>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
