"use client";

import Image from "next/image";
import { HiHome } from "react-icons/hi2";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type BreadcrumbItem = {
  label?: string;
  href?: string;
  image?: string;
  alt_image?: string;
  title?: string;
  description?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations("breadcrumb");

  const trail = items.filter((item) => {
    const label = (item.title || item.label || "").toLowerCase();
    const href = item.href || "";
    return label !== "home" && href !== "/";
  });

  const current = trail[trail.length - 1] ?? items[items.length - 1];
  const heroImage = current?.image || "/hero2.jpg";
  const heroAlt = current?.alt_image || current?.label || t("home");

  return (
    <section className="relative overflow-hidden pt-36 sm:pt-44 lg:pt-52 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-16">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19]/95 via-black/40 to-[#0b0f19]/80" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-playfair text-white leading-tight mb-5">
          {current?.label}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl leading-7 mb-8">
          {current?.description || t("description")}
        </p>

        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center flex-wrap gap-2 sm:gap-3 bg-white/10 border border-white/10 backdrop-blur-2xl px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-sm sm:text-base text-gray-200 hover:text-[#e0bc80] transition-all duration-300"
          >
            <HiHome className="text-lg" />
            <span>{t("home")}</span>
          </Link>

          {trail.map((item, i) => {
            const isLast = i === trail.length - 1;
            const label = item.title || item.label;

            return (
              <div key={`${label}-${i}`} className="flex items-center gap-2">
                <MdKeyboardArrowRight className="text-gray-400 text-lg" />
                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    className="text-sm sm:text-base text-gray-200 hover:text-[#e0bc80] transition-all duration-300"
                  >
                    {label}
                  </Link>
                ) : (
                  <span
                    className="text-sm sm:text-base text-[#e0bc80] font-semibold"
                    aria-current="page"
                  >
                    {label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
