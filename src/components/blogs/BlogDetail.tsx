"use client";

/**
 * Single blog post detail page.
 * Shows article content and related posts sidebar when available.
 */
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import Container from "@/components/common/Container";
import type { BlogDetailsData } from "@/types/blogTypes";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

type BlogDetailProps = {
  blog: BlogDetailsData;
};

export default function BlogDetail({ blog }: BlogDetailProps) {
  const tNav = useTranslations("nav");
  const relatedBlogs = blog.related_blogs ?? [];
  const hasRelated = relatedBlogs.length > 0;

  return (
    <section className="bg-[#0f0f0f] text-white pb-20 sm:pb-28 overflow-hidden">
      <Breadcrumb
        items={[
          { label: tNav("blogs"), href: "/blogs" },
          {
            label: blog.title,
            image: blog.image,
            alt_image: blog.alt_image ?? undefined,
            description: blog.excerpt,
          },
        ]}
      />

      <Container
        className={`grid grid-cols-1 gap-10 lg:gap-12 ${
          hasRelated ? "lg:grid-cols-12" : ""
        }`}
      >
        {/* Main article */}
        <motion.article
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className={`py-12 sm:py-20 ${hasRelated ? "lg:col-span-8" : ""}`}
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center flex-wrap gap-2 sm:gap-3 bg-[#e0bd80b6] border border-white/10 backdrop-blur-2xl px-4 sm:px-6 py-2 rounded-2xl sm:rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.35)] mb-5"
          >
            {blog.published_at}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl mb-5 leading-tight"
          >
            {blog.title}
          </motion.h2>

          {blog.excerpt ? (
            <motion.p
              variants={fadeUp}
              className="mt-4 text-gray-400 max-w-2xl mb-5"
            >
              {blog.excerpt}
            </motion.p>
          ) : null}

          <motion.div
            variants={fadeUp}
            className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative h-[280px] sm:h-[360px] md:min-h-[420px]"
          >
            <Image
              src={blog.image}
              alt={blog.alt_image ?? blog.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white text-2xl text-justify mt-10 max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content || "" }}
          />
        </motion.article>

        {hasRelated ? <RelatedBlogs posts={relatedBlogs} /> : null}
      </Container>
    </section>
  );
}
