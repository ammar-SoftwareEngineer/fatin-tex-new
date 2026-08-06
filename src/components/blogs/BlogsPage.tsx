"use client";

/**
 * Blogs listing page grid.
 */
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import BlogCard from "@/components/blogs/BlogCard";
import Container from "@/components/common/Container";
import type { Blog } from "@/types/blogTypes";
import { fadeUp, staggerDelay, transitionBase, viewportOnce } from "@/lib/motion";

export default function BlogsPage({ blogs }: { blogs: Blog[] }) {
  const t = useTranslations("blogs");
  const tNav = useTranslations("nav");

  return (
    <div className="bg-[#0d0b09] text-white overflow-hidden">
      <Breadcrumb items={[{ label: tNav("blogs") }]} />

      <Container className="py-16">
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
            <BlogCard
              key={blog.id}
              blog={blog}
              motionProps={{
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                transition: { ...transitionBase, delay: staggerDelay(i) },
                viewport: viewportOnce,
              }}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
