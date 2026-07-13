"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { HomeBlog, HomeSection } from "@/types/homeTypes";

const blogImages = ["/blog1.avif", "/blog2.jpg", "/blog3.jpg"];

type BlogSectionProps = {
  blogSection?: HomeSection & { blogs: HomeBlog[] };
};

export default function BlogSection({ blogSection }: BlogSectionProps) {
  void blogSection;
  const t = useTranslations("blogs");
  const tHome = useTranslations("home.blogSection");
  const tCommon = useTranslations("common");

  const blogs = [0, 1, 2].map((i) => ({
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
    img: blogImages[i],
    date: t(`items.${i}.date`),
    slug: t(`items.${i}.slug`),
  }));

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-16 bg-[var(--background)] text-white overflow-hidden">
      <div className="text-center mb-14 sm:mb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-[#e0bc80] tracking-[5px] uppercase text-xs sm:text-sm mb-4"
        >
          {tHome("subtitle")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight"
        >
          {tHome("title")}{" "}
          <span className="text-[#e0bc80]">{tHome("titleHighlight")}</span>
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 lg:gap-8">
        {blogs.map((blog, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
            className="group relative rounded-[30px] overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-xl"
          >
            <div className="relative h-[260px] overflow-hidden">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-5 left-5 bg-[#e0bc80] text-black text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                {blog.date}
              </div>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="text-2xl font-bold mb-4 group-hover:text-[#e0bc80] transition">
                {blog.title}
              </h3>
              <p className="text-gray-400 leading-7 text-sm sm:text-base mb-7">{blog.desc}</p>
              <Link
                href={`/blogs/${blog.slug}`}
                className="inline-flex items-center gap-3 text-[#e0bc80] font-medium"
              >
                {tHome("readMore")} →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-14 sm:mt-16">
        <Link href="/blogs">
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#e0bc80] text-black px-8 sm:px-10 py-4 rounded-full font-semibold shadow-xl inline-block text-center"
          >
            {tCommon("viewAll")}
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
