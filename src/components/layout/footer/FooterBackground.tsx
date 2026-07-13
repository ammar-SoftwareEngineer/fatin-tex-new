"use client";

import { motion } from "framer-motion";

export default function FooterBackground() {
  return (
    <>
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero2.jpg')" }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/75" />

      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-[#0b0f19]
          via-black/70
          to-black/40
        "
      />

      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="
          absolute top-[-100px] left-[10%]
          w-[250px] h-[250px]
          bg-[#e0bc80] blur-3xl rounded-full
        "
      />

      <motion.div
        animate={{
          opacity: [0.08, 0.18, 0.08],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="
          absolute bottom-[-120px] right-[10%]
          w-[300px] h-[300px]
          bg-[#b2895d] blur-3xl rounded-full
        "
      />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{ duration: 3 + i, repeat: Infinity }}
            className="absolute w-1.5 h-1.5 bg-[#e0bc80] rounded-full"
            style={{
              left: `${i * 7}%`,
              top: `${20 + i * 3}%`,
            }}
          />
        ))}
      </div>
    </>
  );
}
