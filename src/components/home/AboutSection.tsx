"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { HomeSection } from "@/types/homeTypes";
import CountUp from "react-countup";
type AboutSectionProps = {
  about?: HomeSection;
};

export default function AboutSection({ about }: AboutSectionProps) {


  const t = useTranslations("home.aboutSection");
  const tCommon = useTranslations("common");


  const titleWords = about?.title?.trim().split(/\s+/).filter(Boolean) ?? [];
  const titleStart = titleWords.slice(0, -1).join(" ");
  const titleHighlight = titleWords.at(-1) ?? "";

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-16 bg-[#0d0b09] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">


        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-5 -left-5 w-full h-full border border-[#e0bc80]/20 rounded-[35px]"
            />
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative rounded-[30px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)] group"
            >
              <img
                src={about?.image || "/about1.jpg"}
                alt={about?.alt_image || "About Image"}
                className="w-full h-[350px] sm:h-[500px] lg:h-[650px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl px-5 sm:px-6 py-4 shadow-2xl"
              >

                <h4 className="text-[#e0bc80] text-xl font-bold mb-1">{t("cardTitle")}</h4>
                <p className="text-gray-300 text-sm">{t("cardDesc")}</p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative lg:pl-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="absolute top-[-50px] sm:top-[-70px] ltr:left-0 rtl:right-0 text-[55px] sm:text-[90px] lg:text-[150px] font-black text-white/[0.03] tracking-[10px] sm:tracking-[18px] uppercase pointer-events-none select-none"
            >
              {t("bgTitle")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#e0bc80] tracking-[5px] uppercase text-xs sm:text-sm mb-5"
            >
              {about?.sub_title}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-7"
            >
              {titleStart && <>{titleStart} </>}
              <span className="text-[#e0bc80]">{titleHighlight}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 leading-8 text-sm sm:text-base lg:text-lg mb-10 max-w-xl"
              dangerouslySetInnerHTML={{ __html: about?.text || "" }}
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12"
            >
              {about?.statistics?.map((item, i) => {
                const number = parseInt(item.title);
                const suffix = item.title.replace(/[0-9]/g, "");

                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10, scale: 1.03 }}
                    className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 text-center transition-all duration-300"
                  >
                    <motion.h3
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-[#e0bc80] text-3xl sm:text-4xl font-bold mb-2"
                    >
                      <CountUp
                        end={number}
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                      {suffix}
                    </motion.h3>

                    <p className="text-gray-400 text-sm">
                      {item.sub_title}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            <Link href={about?.button_link_url || "/about"}>
              <motion.div
                whileHover={{
                  scale: 1.06,
                  y: -3,
                  boxShadow: "0px 15px 40px rgba(224,188,128,0.35)",
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-[#e0bc80] text-black px-8 sm:px-10 py-4 rounded-full font-semibold text-sm sm:text-base shadow-xl inline-block text-center"
              >
                <span className="relative z-10">{about?.button_text || tCommon("exploreMore")}</span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
