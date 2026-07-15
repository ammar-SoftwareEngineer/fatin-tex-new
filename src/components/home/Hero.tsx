"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { easeSmooth, transitionBase, transitionSlow } from "@/lib/motion";

export type HeroSlideView = {
  image: string;
  title: string;
  desc: string;
  buttonText?: string;
  buttonLink?: string | null;
};

type HeroProps = {
  slides?: HeroSlideView[];
};

export default function Hero({ slides }: HeroProps) {
  const t = useTranslations("home.hero");
  const displaySlides = slides?.length ? slides : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = displaySlides[activeIndex];

  useEffect(() => {
    if (displaySlides.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % displaySlides.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, [displaySlides.length]);

  if (!active) {
    return (
      <section className="relative w-full min-h-[520px] h-screen bg-[#0b0f19]" />
    );
  }

  return (
    <section className="relative w-full min-h-[520px] h-screen overflow-hidden">
      <h1 className="sr-only">{displaySlides[0]?.title}</h1>

      {displaySlides.map((slide, index) => (
        <motion.div
          key={`${slide.image}-${index}`}
          initial={false}
          animate={{
            opacity: index === activeIndex ? 1 : 0,
            scale: index === activeIndex ? 1 : 1.03,
          }}
          transition={{ ...transitionSlow, ease: easeSmooth }}
          className="absolute inset-0"
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            sizes="100vw"
            quality={75}
            className="object-cover"
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-20 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={transitionBase}
            >
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitionBase, delay: 0.08 }}
                className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight max-w-3xl"
              >
                {active.title}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitionBase, delay: 0.16 }}
                className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 leading-7 max-w-2xl"
              >
                {active.desc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitionBase, delay: 0.24 }}
              >
                <Link
                  href={active.buttonLink || "/contact"}
                  className="inline-block mt-8 px-8 py-4 rounded-full font-medium text-black bg-gradient-to-r from-[#e0bc80] to-[#f5e6a8] transition-transform duration-300 hover:scale-105"
                >
                  {active.buttonText || t("exploreMore")}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
