"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { contactAction } from "@/actions/contact";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact.schema";

type Status = "idle" | "success" | "error";

const inputClass =
  "p-4 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-[#e0bc80] w-full";

const FIELDS = [
  { name: "name", type: "text", fullWidth: false },
  { name: "email", type: "email", fullWidth: false },
  { name: "phone", type: "tel", fullWidth: true },
] as const;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-xs text-red-400">{message}</p>;
}

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  function onSubmit(values: ContactFormValues) {
    setStatus("idle");

    startTransition(async () => {
      const result = await contactAction(values);

      if (result.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    });
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[28px] p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {FIELDS.map((field) => (
        <div
          key={field.name}
          className={field.fullWidth ? "md:col-span-2" : undefined}
        >
          <input
            type={field.type}
            placeholder={t(field.name)}
            className={inputClass}
            {...register(field.name)}
          />
          <FieldError message={errors[field.name]?.message} />
        </div>
      ))}

      <div className="md:col-span-2">
        <textarea
          placeholder={t("message")}
          rows={6}
          className={inputClass}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {status !== "idle" && (
        <p
          className={`md:col-span-2 text-center text-sm ${
            status === "success" ? "text-[#e0bc80]" : "text-red-400"
          }`}
        >
          {t(status)}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="md:col-span-2 bg-[#e0bc80] text-black py-4 rounded-xl font-medium hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>
    </motion.form>
  );
}
