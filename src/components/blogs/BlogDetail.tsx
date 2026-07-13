"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";

export default function BlogDetail() {
  const blog = {
    title: "The Art of Luxury Fabrics",
    category: "Design",
    image: "/blog1.avif",
    content: `
Luxury fabrics are more than just materials; they are a reflection of craftsmanship, tradition, and innovation.

From the softness of cotton to the elegance of silk, each fabric tells a unique story.

Designers around the world use premium textiles to create timeless pieces that combine comfort and beauty.
    `,
    quote:
      "True luxury is not about price, but about the experience and feeling a fabric creates.",
  };

  const relatedBlogs = [
    {
      title: "Understanding Cotton Quality",
      image: "/blog2.jpg",
      slug: "cotton-quality",
    },
    {
      title: "Silk in Modern Fashion",
      image: "/blog3.jpg",
      slug: "silk-modern-fashion",
    },
    {
      title: "Why Linen is Trending",
      image: "/blog1.avif",
      slug: "linen-trending",
    },
  ];

  return (
    <section className="bg-[#0f0f0f] text-white pb-20 sm:pb-28 overflow-hidden">
      <div className="bg-black">
        <Breadcrumb
          items={[
            { label: "Blogs", href: "/blogs" },
            { label: blog.title, href: "#" },
          ]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-12 sm:py-20 px-4 sm:px-6"
      >
        <p className="text-[#e0bc80] tracking-[3px] sm:tracking-[4px] text-[10px] sm:text-xs mb-3">
          {blog.category}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
          {blog.title}
        </h1>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 sm:px-6"
      >
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={blog.image}
            alt={blog.title}
            width={1200}
            height={700}
            className="w-full h-[280px] sm:h-[400px] md:h-[500px] object-cover"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 max-w-3xl mx-auto"
        >
          <p className="text-gray-300 leading-7 sm:leading-9 text-sm sm:text-lg whitespace-pre-line">
            {blog.content}
          </p>
          <div className="mt-8 sm:mt-10 border-l-4 border-[#e0bc80] pl-4 sm:pl-6 italic text-gray-400 text-sm sm:text-lg">
            {blog.quote}
          </div>
        </motion.div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {relatedBlogs.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/blogs/${post.slug}`}
                className="group block bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-[#e0bc80]/40 transition"
              >
                <div className="relative h-[200px] sm:h-[220px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
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
          ))}
        </div>
      </div>
    </section>
  );
}
