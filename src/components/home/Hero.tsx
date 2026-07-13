"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import "swiper/css";
import "swiper/css/effect-fade";

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
  const [activeIndex, setActiveIndex] = useState(0);


  const displaySlides = slides || [];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full"
      >
        {displaySlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen w-full overflow-hidden">
              <motion.div
                animate={activeIndex === index ? { scale: 1 } : { scale: 1.1 }}
                transition={{ duration: 6, ease: "easeOut" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-20 w-full">
                  <motion.h1
                    key={`title-${activeIndex}`}
                    initial={{ opacity: 0, y: 60 }}
                    animate={
                      activeIndex === index
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 60 }
                    }
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight max-w-3xl"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    key={`desc-${activeIndex}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      activeIndex === index
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 30 }
                    }
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 leading-7 max-w-2xl"
                  >
                    {slide.desc}
                  </motion.p>
                  <motion.div
                    animate={
                      activeIndex === index
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.9 }
                    }
                    transition={{ delay: 0.4 }}
                    className={
                      activeIndex === index
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                    }
                  >
                    <Link
                      href={slide.buttonLink || "/contact"}
                      className="inline-block relative z-50"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0px 15px 40px rgba(224,188,128,0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 px-8 py-4 rounded-full font-medium text-black bg-gradient-to-r from-[#e0bc80] to-[#f5e6a8] transition-all duration-300"
                      >
                        {slide.buttonText || t("exploreMore")}
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
