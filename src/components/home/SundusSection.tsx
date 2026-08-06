"use client";

/**
 * Home page Sundus / Sondos dyeing showcase.
 * Full-bleed video with a floating glass info card.
 */
import { motion } from "framer-motion";
import SondosInfoCard from "@/components/sondos/SondosInfoCard";
import Container from "@/components/common/Container";
import type { HomeSection } from "@/types/homeTypes";

type SundusSectionProps = {
  sundus?: HomeSection;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function SundusSection({ sundus }: SundusSectionProps) {
  // Prefer API media URL; fall back to the local demo video
  const videoSrc = sundus?.image || "/vedio.mp4";

  return (
    <section className="relative min-h-screen bg-[#0d0b09] overflow-hidden">
      <div className="relative z-10 min-h-screen flex items-center py-10 overflow-hidden">
        <Container className="relative flex flex-col lg:block gap-10 overflow-hidden">
          {/* Background video */}
          <motion.div
            initial={{ scale: 0.985, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.95, ease }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl border border-white/10"
          >
            <video
              className="w-full h-[280px] sm:h-[380px] md:h-[520px] lg:h-[650px] object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

          {/* Floating info card (overlays video on large screens) */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.95, ease, delay: 0.15 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:absolute ltr:left-0 rtl:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:max-w-md h-full"
          >
            <SondosInfoCard sundus={sundus} />
          </motion.div>

          {/* Large faded brand word (desktop only) */}
          <motion.div
            initial={{ x: 16, opacity: 0 }}
            whileInView={{ x: 0, opacity: 0.15 }}
            transition={{ duration: 1, ease }}
            viewport={{ once: true, amount: 0.2 }}
            className="absolute ltr:right-6 rtl:left-6 bottom-10 hidden lg:block"
          >
            <p
              aria-hidden="true"
              className="text-[80px] xl:text-[120px] font-bold tracking-[10px] xl:tracking-[20px] text-white"
            >
              SUNDUS
            </p>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
