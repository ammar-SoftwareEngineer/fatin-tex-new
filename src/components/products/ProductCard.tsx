"use client";

/**
 * Shared product card.
 * Used on the home Categories swiper and the products listing page.
 */
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocalizedSlug } from "@/lib/localized-slug";
import type { LocalizedSlug } from "@/lib/localized-slug";

type ProductCardProps = {
  name: string;
  image: string;
  slug: LocalizedSlug;
  categoryLabel?: string;
  ctaLabel: string;
  /** Adds the home-section entrance animation delay */
  index?: number;
  /** Show arrow icon next to the CTA (home section style) */
  showArrow?: boolean;
  /** Extra class on the outer card (e.g. home swiper animation classes) */
  className?: string;
};

export default function ProductCard({
  name,
  image,
  slug,
  categoryLabel,
  ctaLabel,
  index = 0,
  showArrow = false,
  className = "",
}: ProductCardProps) {
  const locale = useLocale();

  return (
    <Link
      href={`/products/${getLocalizedSlug(slug, locale)}`}
      className="block"
    >
      <div
        className={`group relative h-[420px] rounded-[34px] overflow-hidden ${className}`}
        style={
          showArrow
            ? { animationDelay: `${Math.min(index, 6) * 90}ms` }
            : undefined
        }
      >
        <div className="absolute inset-0 overflow-hidden rounded-[34px]">
          <Image
            src={image || "/product1.jpg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-7 z-10">
          {categoryLabel ? (
            <span
              className={`block mb-2 sm:mb-3 ${
                showArrow
                  ? "text-gray-300 text-sm sm:text-base"
                  : "text-[#e0bc80] text-xs tracking-[4px] uppercase"
              }`}
            >
              {categoryLabel}
            </span>
          ) : null}

          <h3
            className={`text-2xl font-bold transition-colors duration-500 group-hover:text-[#e0bc80] ${
              showArrow ? "mb-3" : "mb-5"
            }`}
          >
            {name}
          </h3>

          <div
            className={`flex items-center gap-3 text-[#e0bc80] font-medium opacity-0 translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 ${
              showArrow ? "" : "translate-y-4"
            }`}
          >
            <span>{ctaLabel}</span>
            {showArrow ? (
              <ArrowRight
                size={18}
                className="transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
