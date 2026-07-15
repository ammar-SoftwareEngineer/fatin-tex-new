"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import type { BlogDetailsData } from "@/types/blogTypes";
import { getLocalizedSlug } from "@/lib/localized-slug";
import { useSlugAlternates } from "@/components/i18n/SlugAlternatesProvider";

type BlogDetailProps = {
  blog: BlogDetailsData;
};

export default function BlogDetail({ blog }: BlogDetailProps) {
  const t = useTranslations("blogs");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const { setSlug } = useSlugAlternates();
  const slug = getLocalizedSlug(blog.slug, locale);
  const relatedBlogs = blog.related_blogs ?? [];
  const hasRelated = relatedBlogs.length > 0;

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

      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 gap-10 lg:gap-12 ${
          hasRelated ? "lg:grid-cols-12" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`py-12 sm:py-20 ${hasRelated ? "lg:col-span-8" : ""}`}
        >
          <p className="inline-flex items-center flex-wrap gap-2 sm:gap-3 bg-[#e0bd80b6] border border-white/10 backdrop-blur-2xl px-4 sm:px-6 py-2 rounded-2xl sm:rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.35)] mb-5">
            {blog.published_at}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl mb-5 leading-tight">
            {blog.title}
          </h1>
          {blog.excerpt ? (
            <p className="mt-4 text-gray-400 max-w-2xl mb-5">{blog.excerpt}</p>
          ) : null}

          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative h-[280px] sm:h-[360px] md:min-h-[420px]">
            <Image
              src={blog.image}
              alt={blog.alt_image ?? blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white text-2xl text-justify mt-10 max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content || "" }}
          />
        </motion.div>

        {hasRelated ? (
          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start py-12 sm:py-20">
            <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
              {t("relatedArticles")}
            </h2>
            <div className="flex flex-col gap-4 sm:gap-5">
              {relatedBlogs.map((post, i) => {
           
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={`/blogs/${post.slug[locale]}`}
                      className="group flex gap-3 bg-[#111] rounded-xl overflow-hidden border border-white/10 hover:border-[#e0bc80]/40 transition"
                    >
                      <div className="relative w-[100px] sm:w-[110px] shrink-0 h-[90px] sm:h-[100px] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.alt_image ?? post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-700"
                        />
                      </div>
                      <div className="py-3 pe-3 flex flex-col justify-center min-w-0 gap-1">
                        <h3 className="text-sm sm:text-base font-semibold line-clamp-2 group-hover:text-[#e0bc80] transition">
                          {post.title}
                        </h3>
                        {post.excerpt ? (
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {post.excerpt}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
