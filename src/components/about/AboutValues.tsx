"use client";

/**
 * Company values section on the About page.
 * Each value shows an image + text side by side.
 */
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/common/Container";
import { staggerDelay, transitionBase } from "@/lib/motion";
import type { ValuesSection } from "@/types/aboutTypes";

type AboutValuesProps = {
  items?: ValuesSection[] | null;
};

export default function AboutValues({ items }: AboutValuesProps) {
  const tCommon = useTranslations("common");

  if (!items?.length) return null;

  return (
    <section className="py-20 relative overflow-hidden">
      <Container className="space-y-14 relative z-10">
        {items.map((item, i) => {
          // Alternate layout: even = image left, odd = image right
          const imageOnRight = i % 2 === 1;

          return (
            <motion.div
              key={item.id ?? i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...transitionBase, delay: staggerDelay(i) }}
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border border-white/10 bg-white/5 backdrop-blur-xl rounded-[40px] overflow-hidden p-6 md:p-8"
            >
              <div
                className={`relative overflow-hidden rounded-[30px] h-full lg:col-span-6 ${
                  imageOnRight ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Image
                  src={item.image}
                  width={1000}
                  height={1000}
                  alt={item.alt_image ?? item.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                />
                <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                  <p className="text-[#e0bc80] text-xs tracking-[3px]">
                    {tCommon("brandName")}
                  </p>
                </div>
              </div>

              <div
                className={`lg:col-span-6 ${
                  imageOnRight ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <p className="text-[#e0bc80] tracking-[6px] text-xs mb-4">
                  {item.sub_title}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {item.title ?? ""}
                </h2>
                <div className="w-24 h-[2px] bg-[#e0bc80] mb-6" />
                <div
                  className="text-gray-300 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: item.text || "" }}
                />
              </div>
            </motion.div>
          );
        })}
      </Container>
    </section>
  );
}
