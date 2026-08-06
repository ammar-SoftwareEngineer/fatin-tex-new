"use client";

/**
 * Animated statistics cards for the About page.
 */
import { motion } from "framer-motion";
import StatCard from "@/components/common/StatCard";
import Container from "@/components/common/Container";
import { staggerDelay, transitionBase } from "@/lib/motion";
import type { StatisticsSection } from "@/types/aboutTypes";

type AboutStatsProps = {
  items?: StatisticsSection[] | null;
};

export default function AboutStats({ items }: AboutStatsProps) {
  if (!items?.length) return null;

  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id ?? i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...transitionBase, delay: staggerDelay(i) }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <StatCard
                title={item.title}
                subTitle={item.sub_title ?? ""}
                className="transition-all duration-500"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
