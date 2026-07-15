"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import type { AboutData } from "@/types/aboutTypes";
import Image from "next/image";
import CountUp from "react-countup";
import { cardHover, staggerDelay, transitionBase } from "@/lib/motion";

type AboutPageProps = {
  aboutData: AboutData | null;
};

export default function AboutPage({ aboutData }: AboutPageProps) {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");
  const breadcrumb = aboutData?.breadcrumb_section;
  const aboutUs = aboutData?.about_us_section;

  return (
    <div className="bg-background text-white overflow-hidden">
      <Breadcrumb
        items={[
          {
            label: breadcrumb?.title ?? t("story.title"),
            href: "/about",
            image: breadcrumb?.image,
            alt_image: breadcrumb?.alt_image ?? undefined,
            title: breadcrumb?.title,
            description: breadcrumb?.sub_title,
          },
        ]}
      />

      <section className="px-6 md:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={transitionBase}
            viewport={{ once: true }}
            className="relative"
          >
            <Image
              src={aboutData?.about_us_section?.image || "/about1.jpg"}
              alt={
                aboutData?.about_us_section?.alt_image || tCommon("brandName")
              }
              width={1000}
              height={1000}
              className="rounded-[30px] w-full h-[450px] object-cover border border-white/10 shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 w-[200px] h-[200px] bg-[#e0bc80] blur-3xl opacity-20 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={transitionBase}
            viewport={{ once: true }}
          >
            <p className="text-[#e0bc80] tracking-[6px] text-xs mb-3">
              {aboutData?.about_us_section?.sub_title || t("story.subtitle")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-playfair">
              {aboutData?.about_us_section?.title || t("story.title")}
            </h2>
            {aboutUs?.text ? (
              <div
                className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: aboutData?.about_us_section?.text || "",
                }}
              />
            ) : (
              <>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {t("story.paragraph1")}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t("story.paragraph2")}
                </p>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {aboutData?.statistics_section?.map((item, i) => {
            const number = parseInt(item.title);
            const suffix = item.title.replace(/[0-9]/g, "");

            return (
              <motion.div
                key={item.id ?? i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...transitionBase, delay: staggerDelay(i) }}
                viewport={{ once: true }}
                whileHover={cardHover}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 text-center transition-all duration-300"
              >
                <h3 className="text-[#e0bc80] text-3xl sm:text-4xl font-bold mb-2">
                  <CountUp
                    end={number}
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  {suffix}
                </h3>
                <p className="text-gray-300 mt-2 text-sm">
                  {item?.sub_title ?? ""}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-14 relative z-10">
          {aboutData?.values_section?.map((item, i) => (
            <motion.div
              key={item.id ?? i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...transitionBase, delay: staggerDelay(i) }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border border-white/10 bg-white/5 backdrop-blur-xl rounded-[40px] overflow-hidden p-6 md:p-8"
            >
              <div className="relative overflow-hidden rounded-[30px] h-[350px] lg:col-span-6">
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
              <div className="lg:col-span-6">
                <p className="text-[#e0bc80] tracking-[6px] text-xs mb-4">
                  {item.sub_title}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {item?.title ?? ""}
                </h2>
                <div className="w-24 h-[2px] bg-[#e0bc80] mb-6" />
                <div
                  className="text-gray-300 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: item?.text || "" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
