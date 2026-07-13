"use client";

import React from "react";

export default function VideoSection() {
  return (
    <section className="relative w-full h-[70vh] overflow-hidden bg-black">

      {/* Video */}
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/vedio.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

    </section>
  );
}