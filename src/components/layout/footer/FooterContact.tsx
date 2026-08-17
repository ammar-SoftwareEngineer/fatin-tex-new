"use client";

/**
 * Footer contact cards: address, phone, and email.
 */
import { motion } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import { useLocale } from "next-intl";
import { cardHover, transitionBase, viewportOnce } from "@/lib/motion";
import type { FooterContactInfo } from "./types";

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

function contactHref(key: keyof FooterContactInfo, value: string) {
  if (key === "email") return `mailto:${value}`;
  if (key === "phone") return `tel:${value}`;
  return "";
}

export default function FooterContact({ contact }: FooterContactProps) {
  const isArabic = useLocale() === "ar";
  const align = isArabic ? "text-right" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...transitionBase, delay: 0.22 }}
      viewport={viewportOnce}
      className="mb-12 grid w-full grid-cols-12 gap-5"
    >
      {contactItems.map((item) => {
        const Icon = item.icon;
        const value = contact[item.key];
        const href = contactHref(item.key, value);

        return (
          <motion.div
            key={item.key}
            whileHover={cardHover}
            className="col-span-12 flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-5 backdrop-blur-xl md:col-span-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e0bc80]/15 text-2xl text-[#e0bc80]">
              <Icon />
            </div>
            <div>
              <p className={`mb-2 text-sm text-gray-400 ${align}`}>
                {isArabic ? item.labelAr : item.label}
              </p>
              {href ? (
                <a
                  href={href}
                  dir="ltr"
                  className={`font-medium ${item.key === "email" ? "break-all" : ""} ${align}`}
                >
                  {value}
                </a>
              ) : (
                <p className={`font-medium ${align}`}>{value}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
