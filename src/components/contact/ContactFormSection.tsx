"use client";

/**
 * Message form + map, shown side by side on large screens.
 */
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/common/Container";
import ContactForm from "@/components/contact/ContactForm";
import { transitionBase, transitionSlow, viewportOnce } from "@/lib/motion";

type ContactFormSectionProps = {
  mapSrc: string;
};

export default function ContactFormSection({ mapSrc }: ContactFormSectionProps) {
  const t = useTranslations("contact.form");

  return (
    <section className="pb-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transitionSlow}
          viewport={viewportOnce}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-gray-400">{t("responseTime")}</p>
        </motion.div>

        <div className="grid grid-cols-12 items-stretch gap-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={transitionBase}
            viewport={viewportOnce}
            className="col-span-12 lg:col-span-6"
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ ...transitionBase, delay: 0.12 }}
            viewport={viewportOnce}
            className="col-span-12 lg:col-span-6"
          >
            <div className="h-full rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              {mapSrc ? (
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-[28px]"
                  title="map"
                />
              ) : null}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
