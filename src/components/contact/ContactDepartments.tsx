"use client";

/**
 * Department cards: API data when present, otherwise the local fallback list.
 */
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import Container from "@/components/common/Container";
import {
  cardHover,
  staggerDelay,
  transitionBase,
  transitionSlow,
  viewportOnce,
} from "@/lib/motion";
import { getFallbackDepartments } from "@/lib/contact";
import { cn } from "@/lib/utils";
import type {
  ContactSection,
  NormalizedContactDepartment,
} from "@/types/contactTypes";

type ContactDepartmentsProps = {
  items: NormalizedContactDepartment[];
  section?: Partial<ContactSection> | null;
};

export default function ContactDepartments({
  items,
  section,
}: ContactDepartmentsProps) {
  const t = useTranslations("contact.departments");
  const departments = items.length
    ? items
    : getFallbackDepartments((key) => t(key));
  const title = section?.title || t("title");
  const subtitle = section?.sub_title || t("subtitle");

  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transitionSlow}
          viewport={viewportOnce}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {title}
          </h2>
          {subtitle ? <p className="text-gray-400 mt-3">{subtitle}</p> : null}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department, index) => (
            <DepartmentCard
              key={department.id}
              department={department}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function DepartmentCard({
  department,
  index,
}: {
  department: NormalizedContactDepartment;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...transitionBase, delay: staggerDelay(index) }}
      whileHover={cardHover}
      viewport={viewportOnce}
      className={cn(
        "relative overflow-hidden rounded-[28px] border p-8 backdrop-blur-xl",
        department.featured
          ? "border-[#e0bc80]/25 bg-[#e0bc80]/10"
          : "border-white/10 bg-white/5",
      )}
    >
      <h3 className="mb-6 text-center text-xl font-bold text-[#e0bc80]">
        {department.title}
      </h3>

      <div className="flex flex-col gap-4">
        {department.phone ? (
          <DepartmentLink href={department.phoneHref} icon={<HiOutlinePhone />}>
            {department.phone}
          </DepartmentLink>
        ) : null}

        {department.email ? (
          <DepartmentLink
            href={`mailto:${department.email}`}
            icon={<HiOutlineEnvelope />}
          >
            {department.email}
          </DepartmentLink>
        ) : null}
      </div>
    </motion.div>
  );
}

function DepartmentLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 text-gray-300 transition-colors hover:text-[#e0bc80]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0bc80]/10 text-lg text-[#e0bc80]">
        {icon}
      </span>
      <span dir="ltr" className="break-all text-sm sm:text-base">
        {children}
      </span>
    </a>
  );
}
