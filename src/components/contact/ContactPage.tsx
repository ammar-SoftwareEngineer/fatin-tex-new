"use client";

/**
 * Contact page composition: breadcrumb, info cards, departments, form, map.
 */
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import ContactCards, { type ContactItem } from "@/components/contact/ContactCards";
import ContactDepartments from "@/components/contact/ContactDepartments";
import ContactFormSection from "@/components/contact/ContactFormSection";
import {
  extractIframeSrc,
  formatPhone,
  getApiDepartments,
  getMainBranch,
} from "@/lib/contact";
import type { ContactBranch, ContactData } from "@/types/contactTypes";

type ContactPageProps = {
  contactData?: ContactData | null;
};

export default function ContactPage({ contactData }: ContactPageProps) {
  const t = useTranslations("contact");
  const mainBranch = getMainBranch(contactData);
  const breadcrumb = contactData?.breadcrumb;

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

      <ContactFormSection mapSrc={extractIframeSrc(contactData?.map_iframe)} />
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
