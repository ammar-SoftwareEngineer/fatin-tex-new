"use client";

/**
 * About page: breadcrumb, story, stats, and company values.
 */
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import AboutImageSlider from "@/components/about/AboutImageSlider";
import AboutStats from "@/components/about/AboutStats";
import AboutValues from "@/components/about/AboutValues";
import Container from "@/components/common/Container";
import type { AboutData } from "@/types/aboutTypes";
import { transitionBase } from "@/lib/motion";

type AboutPageProps = {
  aboutData: AboutData | null;
};

export default function AboutPage({ aboutData }: AboutPageProps) {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");

  const breadcrumb = aboutData?.breadcrumb_section;
  const aboutUs = aboutData?.about_us_section;

  // Use API images, or fall back to the main about image
  const fromApi = aboutData?.about_images?.filter((item) => item.url) ?? [];
  const sliderImages =
    fromApi.length > 0
      ? fromApi
      : [{ id: 0, url: aboutUs?.image || "/about1.jpg" }];

  return (
    <div className="bg-background text-white overflow-hidden">
      <Breadcrumb
        items={[
          {
            label: breadcrumb?.title ?? t("story.title"),
            image: breadcrumb?.image,
            alt_image: breadcrumb?.alt_image ?? undefined,
            title: breadcrumb?.title,
            description: breadcrumb?.sub_title,
          },
        ]}
      />

      {/* Story section: image slider + text */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            <AboutImageSlider
              images={sliderImages}
              alt={aboutUs?.alt_image || tCommon("brandName")}
            />

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={transitionBase}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col justify-center"
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
        </Container>
      </section>

      <AboutStats items={aboutData?.statistics_section} />
      <AboutValues items={aboutData?.values_section} />
    </div>
  );
}
