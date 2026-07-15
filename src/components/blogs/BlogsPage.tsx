"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import type { Blog } from "@/types/blogTypes";
import { getLocalizedSlug } from "@/lib/localized-slug";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { cardHover, fadeUp, staggerDelay, transitionBase, viewportOnce } from "@/lib/motion";

export default function BlogsPage({ blogs }: { blogs: Blog[] }) {
  const t = useTranslations("blogs");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="bg-[#0d0b09] text-white overflow-hidden">
      <Breadcrumb items={[{ label: tNav("blogs") }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-playfair">
            {tNav("blogs")}
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            {t("viewAllArticles")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 lg:gap-8">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...transitionBase, delay: staggerDelay(i) }}
            viewport={viewportOnce}
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
              <p className="text-gray-400 leading-7 text-sm sm:text-base mb-7">
                {blog.excerpt}
              </p>
              <Link
                href={`/blogs/${getLocalizedSlug(blog.slug, locale)}`}
                className="text-[#e0bc80] font-medium inline-flex items-center gap-2"
              >
                {t("readMore", { title: blog.title })}{" "}
                {isRtl ? (
                  <FaLongArrowAltLeft className="w-4 h-4" aria-hidden />
                ) : (
                  <FaLongArrowAltRight className="w-4 h-4" aria-hidden />
                )}
              </Link>
            </div>
          </motion.div>
        ))}
        </div>
      </div>
    </div>
  );
}
