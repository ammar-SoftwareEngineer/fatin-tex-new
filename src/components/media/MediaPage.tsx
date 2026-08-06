"use client";

/**
 * Media gallery page (images or videos).
 * Composes the header, grid, and video modal.
 */
import { useState } from "react";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import MediaHeader from "@/components/media/MediaHeader";
import MediaGrid from "@/components/media/MediaGrid";
import VideoModal from "@/components/media/VideoModal";
import Container from "@/components/common/Container";
import type { GalleryItem, MediaType } from "@/components/media/mediaTypes";

type MediaPageProps = {
  type?: MediaType;
  items?: GalleryItem[];
};

export default function MediaPage({
  type = "images",
  items = [],
}: MediaPageProps) {
  const t = useTranslations("media");
  const tNav = useTranslations("nav");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const isVideos = type === "videos";
  const emptyKey = isVideos ? "emptyVideos" : "emptyImages";

  return (
    <section className="bg-[#0f0f0f] text-white pb-28">
      <div className="bg-black">
        <Breadcrumb
          items={[
            { label: tNav("gallery"), href: "/media" },
            { label: isVideos ? tNav("videos") : tNav("images") },
          ]}
        />
      </div>

      <MediaHeader isVideos={isVideos} />

      {items.length === 0 ? (
        <Container>
          <p className="text-center text-gray-500">{t(emptyKey)}</p>
        </Container>
      ) : (
        <MediaGrid
          items={items}
          isVideos={isVideos}
          onPlayVideo={setActiveVideo}
        />
      )}

      <VideoModal
        videoUrl={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
