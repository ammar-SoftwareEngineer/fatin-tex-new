"use client";

import { useTranslations } from "next-intl";
import ContactForm from "@/components/contact/ContactForm";

type PageContactSectionProps = {
  title?: string;
  description?: string;
};

export default function PageContactSection({
  title,
  description,
}: PageContactSectionProps) {
  const t = useTranslations("contact.form");

  return (
    <section className="px-4 sm:px-6 md:px-16 pb-20 sm:pb-28">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-playfair">
            {title || t("title")}
          </h2>
          <p className="text-gray-400 mt-3">
            {description || t("responseTime")}
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
