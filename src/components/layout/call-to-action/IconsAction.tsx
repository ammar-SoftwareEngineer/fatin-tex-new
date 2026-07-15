"use client";

import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import siteData from "@/lib/data/site.json";
import type { CallToAction } from "@/types/layoutTypes";

type IconsActionProps = {
  callToAction?: CallToAction | null;
};

export default function IconsAction({ callToAction }: IconsActionProps) {
  const phone = callToAction?.phone ?? siteData.contact.phone;
  const whatsapp =
    callToAction?.whatsapp ?? siteData.contact.phone.replace(/\D/g, "");

  return (
    <>
      <a
        href={`tel:${phone}`}
        aria-label="Call us"
        className="group relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full overflow-hidden shadow-[0_10px_30px_rgba(224,188,128,0.35)] transition-transform hover:scale-110"
      >
        <span className="absolute inset-0 bg-gradient-to-br from-[#e0bc80] to-[#b2895d]" />
        <FaPhoneAlt className="relative z-10 text-white text-lg sm:text-2xl" />
      </a>

      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full overflow-hidden shadow-[0_10px_30px_rgba(178,137,93,0.35)] transition-transform hover:scale-110"
      >
        <span className="absolute inset-0 bg-gradient-to-br from-[#b2895d] to-[#e0bc80]" />
        <FaWhatsapp className="relative z-10 text-white text-[22px] sm:text-[28px]" />
      </a>
    </>
  );
}
