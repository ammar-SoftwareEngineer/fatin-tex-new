"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocalizedSlug } from "@/lib/localized-slug";
import type { Blog } from "@/types/blogTypes";

type RelatedArticlesProps = {
  articles: Blog[];
  title?: string;
};

export default function RelatedArticles({
  articles,
  title,
}: RelatedArticlesProps) {
  const t = useTranslations("blogs");
  const locale = useLocale();

  if (!articles.length) return null;

  return (
    <section className="px-4 sm:px-6 md:px-16 py-16 sm:py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 font-playfair">
          {title || t("relatedArticles")}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((post) => {
            const slug = getLocalizedSlug(post.slug, locale);
            if (!slug) return null;

            return (
              <Link
                key={post.id}
                href={`/blogs/${slug}`}
                className="group rounded-2xl overflow-hidden border border-white/10 bg-[#111] hover:border-[#e0bc80]/40 transition"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.alt_image ?? post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-[#e0bc80] transition">
                    {post.title}
                  </h3>
                  {post.excerpt ? (
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
