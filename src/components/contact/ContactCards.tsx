"use client";

/**
 * Contact info cards (phone, email, address).
 */
import { motion } from "framer-motion";
import { ReactNode } from "react";
import Container from "@/components/common/Container";
import { cardHover, staggerDelay, transitionBase } from "@/lib/motion";

export type ContactItem = {
  icon: ReactNode;
  title: string;
  desc: string;
  link: string;
  ltr: boolean;
};

type ContactCardsProps = {
  items: ContactItem[];
};

export default function ContactCards({ items }: ContactCardsProps) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...transitionBase, delay: staggerDelay(i) }}
              whileHover={cardHover}
              viewport={{ once: true, amount: 0.2 }}
              className="relative p-8 rounded-[28px] bg-white/5 border border-white/10 backdrop-blur-xl text-center overflow-hidden group"
            >
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full bg-[#e0bc80]/10 flex items-center justify-center text-[#e0bc80] text-2xl">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>

              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir={item.ltr ? "ltr" : undefined}
                  className={`text-gray-400 ${item.ltr ? "inline-block" : ""}`}
                >
                  {item.desc}
                </a>
              ) : null}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
