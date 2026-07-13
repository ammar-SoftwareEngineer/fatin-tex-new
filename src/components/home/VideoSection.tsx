import type { HomeSection } from "@/types/homeTypes";

type VideoSectionProps = {
  video: HomeSection;
};

export default function VideoSection( { video }: VideoSectionProps ) {
  console.log("video", video);
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