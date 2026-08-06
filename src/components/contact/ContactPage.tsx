"use client";

/**
 * Contact page: breadcrumb, contact cards, form, and map.
 */
import { motion } from "framer-motion";
import {
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import ContactForm from "@/components/contact/ContactForm";
import ContactCards from "@/components/contact/ContactCards";
import Container from "@/components/common/Container";
import type { ContactData } from "@/types/contactTypes";
import { transitionBase, transitionSlow } from "@/lib/motion";

type ContactPageProps = {
  contactData?: ContactData | null;
};

export default function ContactPage({ contactData }: ContactPageProps) {
  const t = useTranslations("contact");
  const mainBranch = contactData?.branches?.[0];

  const contactItems = [
    {
      icon: <HiOutlinePhone />,
      title: t("phone.title"),
      desc: `${mainBranch?.phone_1_country_code ?? ""} ${mainBranch?.phone_1 ?? ""}`.trim(),
      link: `tel:${mainBranch?.phone_1_country_code ?? ""}${mainBranch?.phone_1 ?? ""}`,
      ltr: true,
    },
    {
      icon: <HiOutlineEnvelope />,
      title: t("email.title"),
      desc: mainBranch?.email || "",
      link: mainBranch?.email ? `mailto:${mainBranch.email}` : "",
      ltr: true,
    },
    {
      icon: <HiOutlineMapPin />,
      title: mainBranch?.name || "",
      desc: mainBranch?.address || "",
      link: mainBranch?.map_url || "",
      ltr: false,
    },
  ];

  const mapSrc = contactData?.map_iframe?.split('"')[1] || "";

  return (
    <div className="bg-[#0d0b09] text-white overflow-hidden">
      <Breadcrumb
        items={[
          {
            label: contactData?.breadcrumb?.title,
            image: contactData?.breadcrumb?.image,
            alt_image: contactData?.breadcrumb?.alt_image,
            title: contactData?.breadcrumb?.title,
            description: contactData?.breadcrumb?.sub_title,
          },
        ]}
      />

      <ContactCards items={contactItems} />

      <section className="pb-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transitionSlow}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {t("form.title")}
            </h2>
            <p className="text-gray-400 mt-3">{t("form.responseTime")}</p>
          </motion.div>

          <div className="grid grid-cols-12 gap-6 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={transitionBase}
              viewport={{ once: true, amount: 0.2 }}
              className="col-span-12 lg:col-span-6"
            >
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ ...transitionBase, delay: 0.12 }}
              viewport={{ once: true, amount: 0.2 }}
              className="col-span-12 lg:col-span-6"
            >
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[28px] p-6 h-full">
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
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
