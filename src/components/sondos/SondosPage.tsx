"use client";

/**
 * Sondos Dyeing page: breadcrumb, content text, and optional video.
 */
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { SondosData } from "@/types/sondosTypes";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import Container from "@/components/common/Container";
import {
  fadeUp,
  staggerContainer,
  transitionBase,
  viewportOnce,
} from "@/lib/motion";

export default function SondosPage({ data }: { data: SondosData | null }) {
  const t = useTranslations("sondos.page");
  const videoSrc = data?.content?.image || "/vedio.mp4";

  return (
    <div className="overflow-hidden bg-background text-white">
      <Breadcrumb
        items={[
          {
            label: data?.breadcrumb?.title ?? t("heroTitle"),
            image: data?.breadcrumb?.image,
            alt_image: data?.breadcrumb?.alt_image ?? undefined,
            title: data?.breadcrumb?.title,
            description: data?.breadcrumb?.sub_title,
          },
        ]}
      />

      <section className="py-24">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 text-xs tracking-[6px] text-[#e0bc80]"
            >
              {data?.content?.sub_title ?? t("sectionSubtitle")}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl font-bold md:text-6xl"
            >
              {data?.content?.title ?? t("sectionTitle")}
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="mt-6 leading-relaxed text-gray-300"
              dangerouslySetInnerHTML={{
                __html:
                  data?.content?.text || `<p>${t("sectionDescription")}</p>`,
              }}
            />
          </motion.div>

          {videoSrc ? (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...transitionBase, delay: 0.1 }}
              viewport={viewportOnce}
              className="mt-20 w-full"
            >
              <div className="relative overflow-hidden rounded-3xl border-y border-white/10">
                <video
                  className="h-[280px] w-full object-cover sm:h-[380px] md:h-[520px] lg:h-[650px]"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          ) : null}
        </Container>
      </section>
    </div>
  );
}
