"use client";

/**
 * Sondos Dyeing page: breadcrumb, content text, and optional video embed.
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
console.log(data);
    const videoSrc = data?.content?.image || "/vedio.mp4";
  return (
    <div className="bg-background text-white overflow-hidden">
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
            className="max-w-4xl mx-auto text-center"
          >
            <motion.p
              variants={fadeUp}
              className="text-[#e0bc80] tracking-[6px] text-xs mb-4"
            >
              {data?.content?.sub_title ?? t("sectionSubtitle")}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-bold font-playfair"
            >
              {data?.content?.title ?? t("sectionTitle")}
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="text-gray-300 mt-6 leading-relaxed"
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
              className="w-full mt-20 "
            >
              <div className="relative w-full overflow-hidden border-y border-white/10 rounded-3xl">
                <div className="w-full h-[320px] sm:h-[500px] md:h-[650px] relative rounded-2xl">
                  <div className="absolute inset-0 bg-linear-to-tr from-black/60 via-transparent to-black/40 z-10 pointer-events-none" />
                  <video
              className="w-full h-[280px] sm:h-[380px] md:h-[520px] lg:h-[650px] object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
                </div>
              </div>
            </motion.div>
          ) : null}
        </Container>
      </section>
    </div>
  );
}
