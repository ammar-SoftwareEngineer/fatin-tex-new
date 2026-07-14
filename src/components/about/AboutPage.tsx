"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import { Link } from "@/i18n/navigation";
import type { AboutData } from "@/types/aboutTypes";

type AboutPageProps = {
  aboutData: AboutData | null;
};

export default function AboutPage({ aboutData }: AboutPageProps) {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");

  const breadcrumb = aboutData?.breadcrumb_section;
  const aboutUs = aboutData?.about_us_section;

  const stats = [0, 1, 2, 3].map((i) => ({
    num: t(`stats.${i}.num`),
    label: t(`stats.${i}.label`),
  }));

  const missionVision = [0, 1].map((i) => ({
    title: t(`missionVision.items.${i}.title`),
    desc: t(`missionVision.items.${i}.desc`),
    img: i === 0 ? "/hero1.jpg" : "/hero2.jpg",
  }));

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
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={aboutUs?.image || "/about1.jpg"}
              alt={aboutUs?.alt_image || tCommon("brandName")}
              className="rounded-[30px] w-full h-[450px] object-cover border border-white/10 shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 w-[200px] h-[200px] bg-[#e0bc80] blur-3xl opacity-20 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#e0bc80] tracking-[6px] text-xs mb-3">
              {aboutUs?.sub_title || t("story.subtitle")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-playfair">
              {aboutUs?.title || t("story.title")}
            </h2>
            {aboutUs?.text ? (
              <div
                className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: aboutUs.text }}
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
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 text-center border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl"
            >
              <h3 className="text-[#e0bc80] text-3xl font-bold">{item.num}</h3>
              <p className="text-gray-300 mt-2 text-sm">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-14 relative z-10">
          {missionVision.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center border border-white/10 bg-white/5 backdrop-blur-xl rounded-[40px] overflow-hidden p-6 md:p-8"
            >
              <div className="relative overflow-hidden rounded-[30px] h-[350px]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                />
                <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                  <p className="text-[#e0bc80] text-xs tracking-[3px]">
                    {tCommon("brandName")}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[#e0bc80] tracking-[6px] text-xs mb-4">
                  {t("missionVision.luxuryFabrics")}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {item.title}
                </h2>
                <div className="w-24 h-[2px] bg-[#e0bc80] mb-6" />
                <p className="text-gray-300 leading-relaxed text-lg">
                  {item.desc}
                </p>
                <Link href="/contact" className="mt-8 inline-block">
                  <div className="border border-[#e0bc80] text-[#e0bc80] px-6 py-3 rounded-full hover:bg-[#e0bc80] hover:text-black transition inline-block">
                    {tCommon("learnMore")}
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
