"use client";

/**
 * Category tab buttons.
 * Used on the home Categories section to switch active category.
 */
import { motion } from "framer-motion";
import { transitionHover } from "@/lib/motion";
import type { HomeCategory } from "@/types/homeTypes";

type CategoryTabsProps = {
  tabs?: HomeCategory[];
  activeTab: number;
  onChange: (index: number) => void;
};

export default function CategoryTabs({
  tabs,
  activeTab,
  onChange,
}: CategoryTabsProps) {
  if (!tabs?.length) return null;

  return (
    <div className="flex justify-center gap-3 flex-wrap mb-12">
      {tabs.map((tab, i) => (
        <motion.button
          key={tab.id}
          type="button"
          onClick={() => onChange(i)}
          whileHover={{ y: -3, transition: transitionHover }}
          whileTap={{ scale: 0.98 }}
          className={`px-6 py-2.5 rounded-full border text-sm sm:text-base transition-all duration-500 capitalize cursor-pointer ${
            activeTab === i
              ? "bg-[#e0bc80] text-black border-[#e0bc80]"
              : "border-white/10 bg-white/[0.03] hover:border-[#e0bc80]/40"
          }`}
        >
          {tab.name}
        </motion.button>
      ))}
    </div>
  );
}
