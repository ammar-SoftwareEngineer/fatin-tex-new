"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import type { Blog } from "@/types/blogTypes";
import { getLocalizedSlug } from "@/lib/localized-slug";
import { useSlugAlternates } from "@/components/i18n/SlugAlternatesProvider";

type BlogDetailProps = {
  blog: Blog;
  relatedBlogs?: Blog[];
};

export default function BlogDetail({
  blog,
  relatedBlogs = [],
}: BlogDetailProps) {
  const t = useTranslations("blogs");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const { setSlug } = useSlugAlternates();
  const slug = getLocalizedSlug(blog.slug, locale);

  useEffect(() => {
    setSlug(blog.slug);
    return () => setSlug(null);
  }, [blog.slug, setSlug]);

  return (
    <section className="bg-[#0f0f0f] text-white pb-20 sm:pb-28 overflow-hidden">
      <Breadcrumb
        items={[
          { label: tNav("blogs"), href: "/blogs" },
          {
            label: blog.title,
            href: `/blogs/${slug}`,
            image: blog.image,
            alt_image: blog.alt_image ?? undefined,
            description: blog.excerpt,
          },
        ]}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-12 sm:py-20 px-4 sm:px-6"
      >
        <p className="text-[#e0bc80] tracking-[3px] sm:tracking-[4px] text-[10px] sm:text-xs mb-3">
          {blog.published_at}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
          {blog.title}
        </h1>
        {blog.excerpt ? (
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">{blog.excerpt}</p>
        ) : null}
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative h-[280px] sm:h-[400px] md:h-[500px]">
          <Image
            src={blog.image}
            alt={blog.alt_image ?? blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 max-w-6xl mx-auto"
        >
          <div
            className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white text-2xl"
            dangerouslySetInnerHTML={{ __html: blog.content || "" }}
          />
        </motion.div>
      </motion.div>

      {relatedBlogs.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 sm:mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center">
            {t("relatedArticles")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {relatedBlogs.map((post, i) => {
              const postSlug = getLocalizedSlug(post.slug, locale);
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/blogs/${postSlug}`}
                    className="group block bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-[#e0bc80]/40 transition"
                  >
                    <div className="relative h-[200px] sm:h-[220px] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.alt_image ?? post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base sm:text-lg font-semibold group-hover:text-[#e0bc80] transition">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
