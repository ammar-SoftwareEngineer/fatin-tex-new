"use client";

/**
 * Media page header: title, description, and Images / Videos tabs.
 */
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/common/Container";
import { fadeUp, viewportOnce } from "@/lib/motion";

type MediaHeaderProps = {
  isVideos: boolean;
};

export default function MediaHeader({ isVideos }: MediaHeaderProps) {
  const t = useTranslations("media");
  const tNav = useTranslations("nav");

  const titleKey = isVideos ? "videosTitle" : "imagesTitle";
  const highlightKey = isVideos ? "videosHighlight" : "imagesHighlight";

  return (
    <Container>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="text-center py-16"
      >
        <p className="text-[#e0bc80] tracking-[5px] uppercase text-xs mb-4">
          {t("subtitle")}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold">
          {t(titleKey)}{" "}
          <span className="text-[#e0bc80]">{t(highlightKey)}</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{t("description")}</p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/media/images"
            className={`px-6 py-2.5 rounded-full border text-sm transition ${
              !isVideos
                ? "bg-[#e0bc80] text-black border-[#e0bc80]"
                : "border-white/20 text-white hover:border-[#e0bc80]"
            }`}
          >
            {tNav("images")}
          </Link>
          <Link
            href="/media/videos"
            className={`px-6 py-2.5 rounded-full border text-sm transition ${
              isVideos
                ? "bg-[#e0bc80] text-black border-[#e0bc80]"
                : "border-white/20 text-white hover:border-[#e0bc80]"
            }`}
          >
            {tNav("videos")}
          </Link>
        </div>
      </motion.div>
    </Container>
  );
}
