"use client";

/**
 * Contact page: breadcrumb, info cards, departments, form, and map.
 */
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import ContactCards, { type ContactItem } from "@/components/contact/ContactCards";
import ContactDepartments from "@/components/contact/ContactDepartments";
import ContactForm from "@/components/contact/ContactForm";
import Container from "@/components/common/Container";
import {
  extractIframeSrc,
  formatPhone,
  getApiDepartments,
  getMainBranch,
} from "@/lib/contact";
import { transitionBase, transitionSlow, viewportOnce } from "@/lib/motion";
import type { ContactBranch, ContactData } from "@/types/contactTypes";

type ContactPageProps = {
  contactData?: ContactData | null;
};

export default function ContactPage({ contactData }: ContactPageProps) {
  const t = useTranslations("contact");
  const mainBranch = getMainBranch(contactData);
  const breadcrumb = contactData?.breadcrumb;
  const mapSrc = extractIframeSrc(contactData?.map_iframe);

  return (
    <div className="overflow-hidden bg-[#0d0b09] text-white">
      <Breadcrumb
        items={[
          {
            label: breadcrumb?.title,
            image: breadcrumb?.image,
            alt_image: breadcrumb?.alt_image ?? undefined,
            title: breadcrumb?.title,
            description: breadcrumb?.sub_title,
          },
        ]}
      />

      <ContactCards items={buildContactCards(mainBranch, t)} />

      <ContactDepartments
        items={getApiDepartments(contactData)}
        section={contactData?.departments_section}
      />

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
              {t("form.title")}
            </h2>
            <p className="mt-3 text-gray-400">{t("form.responseTime")}</p>
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
    </div>
  );
}

function buildContactCards(
  branch: ContactBranch | undefined,
  t: ReturnType<typeof useTranslations>,
): ContactItem[] {
  const phone = formatPhone(branch?.phone_1_country_code, branch?.phone_1);

  return [
    {
      icon: <HiOutlinePhone />,
      title: t("phone.title"),
      desc: phone.display,
      link: phone.href,
      ltr: true,
    },
    {
      icon: <HiOutlineEnvelope />,
      title: t("email.title"),
      desc: branch?.email || "",
      link: branch?.email ? `mailto:${branch.email}` : "",
      ltr: true,
    },
    {
      icon: <HiOutlineMapPin />,
      title: branch?.name || "",
      desc: branch?.address || "",
      link: branch?.map_url || "",
      ltr: false,
    },
  ];
}
