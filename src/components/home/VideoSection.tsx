import type { HomeSection } from "@/types/homeTypes";

type VideoSectionProps = {
  video?: HomeSection | null;
};

export default function VideoSection({ video }: VideoSectionProps) {
  const src = video?.image || "/vedio.mp4";

  return (
    <section className="relative w-full h-[70vh] overflow-hidden bg-black">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </section>
  );
}
