"use client";

/**
 * Single statistic card with CountUp animation.
 * Shared by the home About section and the About page.
 */
import { motion, type Variants } from "framer-motion";
import CountUp from "react-countup";
import { cardHover } from "@/lib/motion";
import { parseStatTitle } from "@/lib/utils";

type StatCardProps = {
  title: string;
  subTitle?: string;
  /** Framer Motion variants for staggered lists */
  variants?: Variants;
  className?: string;
};

export default function StatCard({
  title,
  subTitle = "",
  variants,
  className = "",
}: StatCardProps) {
  const { number, suffix } = parseStatTitle(title);

  return (
    <motion.div
      variants={variants}
      whileHover={cardHover}
      className={`bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 text-center transition-all duration-300 ${className}`}
    >
      <h3 className="text-[#e0bc80] text-3xl sm:text-4xl font-bold mb-2">
        <CountUp end={number} duration={2.5} enableScrollSpy scrollSpyOnce />
        {suffix}
      </h3>
      <p className="text-gray-300 mt-2 text-sm">{subTitle}</p>
    </motion.div>
  );
}
