"use client";

import { useTranslations } from "next-intl";
import type { SondosData } from "@/types/sondosTypes";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";

export default function SondosPage({ data }: { data: SondosData | null }) {
  const t = useTranslations("sondos.page");

  const videoUrl =
    data?.content?.button_link_url || data?.content?.image || null;

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

      <section className="px-6 md:px-16 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#e0bc80] tracking-[6px] text-xs mb-4">
            {data?.content?.sub_title ?? t("sectionSubtitle")}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold font-playfair">
            {data?.content?.title ?? t("sectionTitle")}
          </h2>
          <div
            className="text-gray-300 mt-6 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html:
                data?.content?.text || `<p>${t("sectionDescription")}</p>`,
            }}
          />
        </div>

        {videoUrl ? (
          <div className="w-full mt-20">
            <div className="relative w-full overflow-hidden border-y border-white/10">
              <div className="w-full h-[320px] sm:h-[500px] md:h-[650px] relative rounded-2xl">
                <div className="absolute inset-0 bg-linear-to-tr from-black/60 via-transparent to-black/40 z-10 pointer-events-none" />
                <iframe
                  src={videoUrl}
                  title={data?.content?.title ?? t("sectionTitle")}
                  className="w-full h-full rounded-2xl"
                  allowFullScreen
                  loading="lazy"
                  allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
