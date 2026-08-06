"use client";

/**
 * Statistic cards for the home About section.
 */
import { motion } from "framer-motion";
import StatCard from "@/components/common/StatCard";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

type StatItem = {
  id?: number;
  title: string;
  sub_title: string;
};

type AboutSectionStatsProps = {
  items?: StatItem[];
};

export default function AboutSectionStats({ items }: AboutSectionStatsProps) {
  if (!items?.length) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12"
    >
      {items.map((item, i) => (
        <StatCard
          key={item.id ?? i}
          title={item.title}
          subTitle={item.sub_title}
          variants={staggerItem}
        />
      ))}
    </motion.div>
  );
}
