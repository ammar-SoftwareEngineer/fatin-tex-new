"use client";

import { motion } from "framer-motion";
import type { HomeSection } from "@/types/homeTypes";
import { fadeUp, viewportOnce, transitionBase } from "@/lib/motion";


type VideoSectionProps = {
  video?: HomeSection | null;
};

export default function VideoSection({ video }: VideoSectionProps) {
  const src = video?.image || "/vedio.mp4";

  return (
    <section className="relative w-full h-[70vh] overflow-hidden bg-black">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute inset-0"
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={src} type="video/mp4" />
        </video>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={transitionBase}
        viewport={viewportOnce}
        className="absolute inset-0 bg-black/40"
      />
    </section>
  );
}
