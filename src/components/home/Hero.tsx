"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
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
  const primaryTitle = displaySlides[0]?.title;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {primaryTitle ? (
        <h1 className="sr-only">{primaryTitle}</h1>
      ) : null}

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={displaySlides.length > 1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full"
      >
        {displaySlides.map((slide, index) => {
          const ctaHref = slide.buttonLink || "/contact";
          const ctaClassName =
            "inline-block px-8 py-4 rounded-full font-medium text-black bg-gradient-to-r from-[#e0bc80] to-[#f5e6a8] transition-transform duration-300 hover:scale-105";

          return (
            <SwiperSlide key={index}>
              <div className="relative h-screen w-full overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={`object-cover transition-transform duration-[6000ms] ease-out ${
                    activeIndex === index ? "scale-100" : "scale-105"
                  }`}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-6 md:px-20 w-full">
                    <p
                      className={`text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight max-w-3xl transition-all duration-500 ${
                        activeIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                    >
                      {slide.title}
                    </p>
                    <p
                      className={`mt-6 text-base sm:text-lg md:text-xl text-gray-300 leading-7 max-w-2xl transition-all duration-500 delay-100 ${
                        activeIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      {slide.desc}
                    </p>
                    <div
                      className={`mt-8 transition-opacity duration-300 ${
                        activeIndex === index
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <Link href={ctaHref} className={ctaClassName}>
                        {slide.buttonText || t("exploreMore")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
