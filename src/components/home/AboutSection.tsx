"use client";

/**
 * Home page About section: image slider + story text + stats + CTA.
 */
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AboutSectionSlider from "@/components/about/AboutSectionSlider";
import AboutSectionStats from "@/components/about/AboutSectionStats";
import Container from "@/components/common/Container";
import type { HomeSection } from "@/types/homeTypes";
import type { ImageItem } from "@/types/aboutTypes";
import {
  fadeRight,
  fadeUp,
  transitionBase,
  viewportOnce,
} from "@/lib/motion";
import { splitTitleHighlight } from "@/lib/utils";

type AboutSectionProps = {
  about?: HomeSection;
  aboutImages?: ImageItem[];
};

export default function AboutSection({
  about,
  aboutImages = [],
}: AboutSectionProps) {
  const t = useTranslations("home.aboutSection");
  const tCommon = useTranslations("common");

  const { start: titleStart, highlight: titleHighlight } = splitTitleHighlight(
    about?.title,
  );

  // Prefer API images; fall back to the section image
  const validImages = aboutImages.filter((item) => item.url);
  const images =
    validImages.length > 0
      ? validImages
      : [{ id: 0, url: about?.image || "/about1.jpg" }];

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-[#0d0b09] text-white overflow-hidden">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch relative">
          <AboutSectionSlider
            images={images}
            alt={about?.alt_image || about?.title || tCommon("brandName")}
          />

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative flex flex-col justify-center lg:pl-6"
          >
            {/* Large faded background word */}
            <p
              aria-hidden="true"
              className="absolute top-[-50px] sm:top-[-70px] ltr:left-0 rtl:right-0 text-[55px] sm:text-[90px] lg:text-[150px] font-black text-white/[0.03] tracking-[10px] sm:tracking-[18px] uppercase pointer-events-none select-none"
            >
              {t("bgTitle")}
            </p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ ...transitionBase, delay: 0.1 }}
              className="text-[#e0bc80] tracking-[5px] uppercase text-xs sm:text-sm mb-5"
            >
              {about?.sub_title}
            </motion.p>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ ...transitionBase, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-7"
            >
              {titleStart && <>{titleStart} </>}
              <span className="text-[#e0bc80]">{titleHighlight}</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ ...transitionBase, delay: 0.3 }}
              className="text-gray-400 leading-8 text-sm sm:text-base lg:text-lg mb-8 max-w-xl"
              dangerouslySetInnerHTML={{ __html: about?.text || "" }}
            />

            <AboutSectionStats items={about?.statistics} />

            <Link
              href={about?.button_link_url || "/about"}
              className="relative overflow-hidden bg-[#e0bc80] text-black px-8 sm:px-10 py-4 rounded-full font-semibold text-sm sm:text-base shadow-xl inline-block text-center transition-transform hover:scale-[1.03] mt-auto w-fit"
            >
              {about?.button_text || tCommon("exploreMore")}
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
