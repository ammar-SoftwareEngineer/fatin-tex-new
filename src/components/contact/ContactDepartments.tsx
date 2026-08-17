"use client";

/**
 * Department contact cards. Uses API data when available, otherwise local fallback.
 */
import { motion } from "framer-motion";
import { HiOutlinePhone, HiOutlineEnvelope } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import Container from "@/components/common/Container";
import { cardHover, staggerDelay, transitionBase, transitionSlow } from "@/lib/motion";
import type {
  ContactSection,
  NormalizedContactDepartment,
} from "@/types/contactTypes";

const FALLBACK_DEPARTMENTS = [
  {
    key: "technical",
    phone: "+201277533059",
    email: "Fateen@fatintex.com",
  },
  {
    key: "sales",
    phone: "+20100181222",
    displayPhone: "+20 100 181 222",
    email: "sales@fatintex.com",
    featured: true,
  },
  {
    key: "finance",
    phone: "+201288466281",
    email: "Mohammed@fatintex.com",
  },
] as const;

type ContactDepartmentsProps = {
  items: NormalizedContactDepartment[];
  section?: Partial<ContactSection> | null;
};

export default function ContactDepartments({
  items,
  section,
}: ContactDepartmentsProps) {
  const t = useTranslations("contact.departments");

  const departments: NormalizedContactDepartment[] = items.length
    ? items
    : FALLBACK_DEPARTMENTS.map((dept, index) => ({
        id: dept.key,
        title: t(dept.key),
        phone: "displayPhone" in dept ? dept.displayPhone : dept.phone,
        phoneHref: `tel:${dept.phone}`,
        email: dept.email,
        featured: "featured" in dept && dept.featured,
        order: index,
      }));

  const title = section?.title || t("title");
  const subtitle = section?.sub_title || t("subtitle");

  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transitionSlow}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{title}</h2>
          {subtitle ? <p className="text-gray-400 mt-3">{subtitle}</p> : null}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...transitionBase, delay: staggerDelay(i) }}
              whileHover={cardHover}
              viewport={{ once: true, amount: 0.2 }}
              className={`relative p-8 rounded-[28px] border backdrop-blur-xl overflow-hidden ${
                dept.featured
                  ? "bg-[#e0bc80]/10 border-[#e0bc80]/25"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <h3 className="text-xl font-bold mb-6 text-center text-[#e0bc80]">
                {dept.title}
              </h3>

              <div className="flex flex-col gap-4">
                {dept.phone ? (
                  <a
                    href={dept.phoneHref}
                    className="flex items-center gap-3 text-gray-300 hover:text-[#e0bc80] transition-colors"
                  >
                    <span className="w-10 h-10 rounded-full bg-[#e0bc80]/10 flex items-center justify-center text-[#e0bc80] text-lg shrink-0">
                      <HiOutlinePhone />
                    </span>
                    <span dir="ltr" className="text-sm sm:text-base">
                      {dept.phone}
                    </span>
                  </a>
                ) : null}

                {dept.email ? (
                  <a
                    href={`mailto:${dept.email}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-[#e0bc80] transition-colors"
                  >
                    <span className="w-10 h-10 rounded-full bg-[#e0bc80]/10 flex items-center justify-center text-[#e0bc80] text-lg shrink-0">
                      <HiOutlineEnvelope />
                    </span>
                    <span dir="ltr" className="text-sm sm:text-base break-all">
                      {dept.email}
                    </span>
                  </a>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
