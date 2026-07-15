"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  title: string;
  subtitle?: string;
  items: FaqItem[];
};

export default function FaqSection({ title, subtitle, items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <section className="px-4 sm:px-6 md:px-16 py-16 sm:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          {subtitle ? (
            <p className="text-[#e0bc80] tracking-[4px] uppercase text-xs mb-3">
              {subtitle}
            </p>
          ) : null}
          <h2 className="text-3xl sm:text-4xl font-bold font-playfair">{title}</h2>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {item.question}
                  </h3>
                  <FaChevronDown
                    className={`shrink-0 text-[#e0bc80] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 pb-5 text-sm sm:text-base text-gray-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
