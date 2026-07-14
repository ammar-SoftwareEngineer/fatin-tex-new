"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiOutlinePhone, HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/hero/Breadcrumb";
import ContactForm from "@/components/contact/ContactForm";
import type { ContactData } from "@/types/contactTypes";
import siteData from "@/lib/data/site.json";

type ContactPageProps = {
  contactData?: ContactData | null;
};

export default function ContactPage({ contactData }: ContactPageProps) {
  const t = useTranslations("contact");
  const tNav = useTranslations("nav");
console.log(contactData);
  const mainBranch = contactData?.branches?.[0];

  const contactItems = [
    {
      icon: <HiOutlinePhone />,
      title: t("phone.title"),
      desc: `${mainBranch?.phone_1_country_code} ${mainBranch?.phone_1}` || "",
    },
    {
      icon: <HiOutlineEnvelope />,
      title: t("email.title"),
      desc: `${mainBranch?.email}` || "",
    },
    {
      icon: <HiOutlineMapPin />,
      title: t("location.title"),
      desc: `${mainBranch?.address}` || "",
    },
  ];

  return (
    <div className="bg-[#0d0b09] text-white overflow-hidden">
      <Breadcrumb items={[{ label: contactData?.breadcrumb?.title, href: "/contact", image: contactData?.breadcrumb?.image, alt_image: contactData?.breadcrumb?.alt_image, title: contactData?.breadcrumb?.title, description: contactData?.breadcrumb?.sub_title }]} />

      <section className="px-4 sm:px-6 md:px-16 py-20 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contactItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-[28px] bg-white/5 border border-white/10 backdrop-blur-xl text-center overflow-hidden group"
            >
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full bg-[#e0bc80]/10 flex items-center justify-center text-[#e0bc80] text-2xl">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className=" px-4 sm:px-6 md:px-16 pb-28">
           <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t("form.title")}</h2>
            <p className="text-gray-400 mt-3">{t("form.responseTime")}</p>
          </motion.div>
          <div className="grid grid-cols-12 gap-6 items-stretch">
          <div className=" col-span-12 lg:col-span-6">
       

       <ContactForm />
     </div>
     <div className=" col-span-12 lg:col-span-6">
       <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[28px] p-6  h-full">
       <iframe src={contactData?.map_iframe?.split("\"")[1] || ""} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-[28px]"></iframe>
       </div>
     </div>
          </div>
        
      </section>
    </div>
  );
}
