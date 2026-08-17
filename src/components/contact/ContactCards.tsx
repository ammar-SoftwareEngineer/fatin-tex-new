"use client";

/**
 * Top contact info cards: phone, email, and address.
 */
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Container from "@/components/common/Container";
import { isExternalHref } from "@/lib/contact";
import { cardHover, staggerDelay, transitionBase, viewportOnce } from "@/lib/motion";

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
  const visibleItems = items.filter((item) => item.title || item.desc);

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, index) => (
            <ContactCard key={item.title || index} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ContactCard({
  item,
  index,
}: {
  item: ContactItem;
  index: number;
}) {
  const opensInNewTab = isExternalHref(item.link);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...transitionBase, delay: staggerDelay(index) }}
      whileHover={cardHover}
      viewport={viewportOnce}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl"
    >
      <div className="mb-5 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e0bc80]/10 text-2xl text-[#e0bc80]">
          {item.icon}
        </div>
      </div>

      <h3 className="mb-2 text-xl font-bold">{item.title}</h3>

      {item.link && item.desc ? (
        <a
          href={item.link}
          target={opensInNewTab ? "_blank" : undefined}
          rel={opensInNewTab ? "noopener noreferrer" : undefined}
          dir={item.ltr ? "ltr" : undefined}
          className={item.ltr ? "inline-block text-gray-400" : "text-gray-400"}
        >
          {item.desc}
        </a>
      ) : (
        <p className="text-gray-400">{item.desc}</p>
      )}
    </motion.div>
  );
}
