"use client";

/**
 * Home page latest blogs section.
 */
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import BlogCard from "@/components/blogs/BlogCard";
import Container from "@/components/common/Container";
import type { HomeBlog, HomeSection } from "@/types/homeTypes";
import { splitTitleHighlight } from "@/lib/utils";

type BlogSectionProps = {
  blogSection?: HomeSection & { blogs: HomeBlog[] };
};

export default function BlogSection({ blogSection }: BlogSectionProps) {
  const t = useTranslations("blogs");
  const { start: titleStart, highlight: titleHighlight } = splitTitleHighlight(
    blogSection?.title,
  );
  const blogs = blogSection?.blogs ?? [];

  if (!blogs.length && !blogSection?.title) return null;

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-background text-white overflow-hidden">
      <Container>
        <div className="text-center mb-14 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-[#e0bc80] tracking-[5px] uppercase text-xs sm:text-sm mb-4"
          >
            {blogSection?.sub_title}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight"
          >
            {titleStart}{" "}
            {titleHighlight ? (
              <span className="text-[#e0bc80]">{titleHighlight}</span>
            ) : null}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 lg:gap-8">
          {blogs.map((blog, i) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              motionProps={{
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                transition: {
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                  delay: Math.min(i * 0.08, 0.4),
                },
                viewport: { once: true, amount: 0.15 },
              }}
            />
          ))}
        </div>

        <div className="flex justify-center mt-14 sm:mt-16">
          <Link
            href={blogSection?.button_link_url || "/blogs"}
            className="bg-[#e0bc80] text-black px-8 sm:px-10 py-4 rounded-full font-semibold shadow-xl inline-block text-center transition-transform hover:scale-105"
          >
            {blogSection?.button_text || t("viewAllArticles")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
