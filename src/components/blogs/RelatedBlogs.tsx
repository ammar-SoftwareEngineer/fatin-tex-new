"use client";

/**
 * Related blog posts sidebar on the blog detail page.
 */
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocalizedSlug } from "@/lib/localized-slug";
import {
  cardHover,
  staggerDelay,
  staggerItem,
  transitionBase,
  viewportOnce,
} from "@/lib/motion";
import type { RelatedBlog } from "@/types/blogTypes";

type RelatedBlogsProps = {
  posts: RelatedBlog[];
};

export default function RelatedBlogs({ posts }: RelatedBlogsProps) {
  const t = useTranslations("blogs");
  const locale = useLocale();

  if (!posts.length) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={transitionBase}
      viewport={viewportOnce}
      className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start py-12 sm:py-20"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        {t("relatedArticles")}
      </h2>

      <div className="flex flex-col gap-4 sm:gap-5">
        {posts.map((post, i) => {
          const postSlug = getLocalizedSlug(post.slug, locale);
          if (!postSlug) return null;

          return (
            <motion.div
              key={post.id}
              variants={staggerItem}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ delay: staggerDelay(i) }}
              whileHover={cardHover}
            >
              <Link
                href={`/blogs/${postSlug}`}
                className="group flex gap-3 bg-[#111] rounded-xl overflow-hidden border border-white/10 hover:border-[#e0bc80]/40 transition"
              >
                <div className="relative w-[100px] sm:w-[110px] shrink-0 h-[90px] sm:h-[100px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.alt_image ?? post.title}
                    fill
                    sizes="110px"
                    className="object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
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
    </motion.aside>
  );
}
