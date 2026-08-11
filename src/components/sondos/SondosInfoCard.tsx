"use client";

/**
 * Floating glass info card for the Sundus / Sondos home section.
 */
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { HomeSection } from "@/types/homeTypes";

type SondosInfoCardProps = {
  sundus?: HomeSection;
};

export default function SondosInfoCard({ sundus }: SondosInfoCardProps) {
  const t = useTranslations("home.sundusSection");

  return (
    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-[28px] md:rounded-[40px] p-6 sm:p-8 md:p-11 shadow-2xl overflow-hidden">
      <div className="absolute ltr:left-0 rtl:right-0 top-0 h-full w-[2px] bg-[#e0bc80]" />

      <div className="mb-5 sm:mb-6 relative h-16 sm:h-20 md:h-24 w-40">
        <Image
          src="/sondos.png"
          alt={sundus?.title || "Sondos Dyeing"}
          fill
          sizes="160px"
          className="object-contain drop-shadow-[0_0_20px_rgba(224,188,128,0.4)]"
          loading="lazy"
        />
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-playfair">
        {sundus?.title}
      </h2>

      <div className="flex items-center gap-3 my-5 sm:my-6">
        <div className="w-8 sm:w-12 h-[2px] bg-[#e0bc80]" />
        <div className="w-2 h-2 bg-[#e0bc80] rounded-full" />
      </div>

      <p
        className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md"
        dangerouslySetInnerHTML={{ __html: sundus?.text || "" }}
        suppressHydrationWarning
      />

      <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6" suppressHydrationWarning>
        <Link
          href={sundus?.button_link_url || "/sondos-dyeing"}
          className="bg-[#e0bc80] text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base flex items-center justify-center text-center gap-2 transition-transform hover:scale-105"
        >
          {sundus?.button_text || t("exploreMore")}
          <span className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-black text-black rounded-full hover:bg-black hover:text-white transition">
            <ArrowRightIcon className="w-5 h-5 ltr:rotate-0 rtl:rotate-180" />
          </span>
        </Link>
      </div>

      <div className="absolute -bottom-10 -right-10 w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] bg-[#e0bc80] blur-3xl opacity-10 rounded-full" />
    </div>
  );
}
