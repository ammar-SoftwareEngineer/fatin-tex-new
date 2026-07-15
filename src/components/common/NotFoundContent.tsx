"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { fadeUp, staggerContainer, transitionBase } from "@/lib/motion";

type NotFoundContentProps = {
  brandName: string;
  title?: string;
  description?: string;
  homeLabel?: string;
};

export default function NotFoundContent({
  brandName,
  title = "404",
  description = "Page not found",
  homeLabel = "Back to home",
}: NotFoundContentProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.h1
        variants={fadeUp}
        className="text-6xl sm:text-7xl font-bold text-[#e0bc80]"
      >
        {title}
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="mt-4 text-xl text-gray-300"
      >
        {description}
      </motion.p>
      <motion.p variants={fadeUp} className="mt-2 text-gray-500">
        {brandName}
      </motion.p>
      <motion.div variants={fadeUp} transition={transitionBase}>
        <Link
          href="/"
          className="inline-block mt-8 px-8 py-3 rounded-full bg-[#e0bc80] text-black font-medium transition-transform hover:scale-105"
        >
          {homeLabel}
        </Link>
      </motion.div>
    </motion.div>
  );
}
