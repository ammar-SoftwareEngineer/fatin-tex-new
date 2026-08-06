"use client";

/**
 * Blog card used on the blogs listing page and the home blog section.
 */
import Image from "next/image";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { getLocalizedSlug } from "@/lib/localized-slug";
import { cardHover } from "@/lib/motion";
import type { Blog } from "@/types/blogTypes";

type BlogCardProps = {
  blog: Pick<
    Blog,
    "id" | "title" | "excerpt" | "image" | "alt_image" | "published_at" | "slug"
  >;
  /** Optional framer-motion entrance props */
  motionProps?: Pick<
    HTMLMotionProps<"div">,
    "initial" | "whileInView" | "transition" | "viewport"
  >;
};

export default function BlogCard({ blog, motionProps }: BlogCardProps) {
  const t = useTranslations("blogs");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <motion.div
      {...motionProps}
      whileHover={cardHover}
      className="group relative rounded-[30px] overflow-hidden bg-white/3 border border-white/10 backdrop-blur-xl"
    >
      <div className="relative h-[260px] overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.alt_image ?? blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-5 left-5 bg-[#e0bc80] text-black text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
          {blog.published_at}
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <h3 className="text-2xl font-bold mb-4 group-hover:text-[#e0bc80] transition">
          {blog.title}
        </h3>
        {blog.excerpt ? (
          <p className="text-gray-400 leading-7 text-sm sm:text-base mb-7">
            {blog.excerpt}
          </p>
        ) : null}
        <Link
          href={`/blogs/${getLocalizedSlug(blog.slug, locale)}`}
          className="text-[#e0bc80] font-medium inline-flex items-center gap-2"
        >
          {t("readMore")}{" "}
          {isRtl ? (
            <FaLongArrowAltLeft className="w-4 h-4" aria-hidden />
          ) : (
            <FaLongArrowAltRight className="w-4 h-4" aria-hidden />
          )}
        </Link>
      </div>
    </motion.div>
  );
}
