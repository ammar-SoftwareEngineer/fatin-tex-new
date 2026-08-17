"use client";

/**
 * Contact form with validation (react-hook-form + zod).
 * Submits through the contact server action.
 */
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { contactAction } from "@/actions/contact";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact.schema";
import { transitionSlow } from "@/lib/motion";

type Status = "idle" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:border-[#e0bc80]";

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
  const fieldDirection = useLocale() === "ar" ? "rtl" : "ltr";
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
        return;
      }
      setStatus("error");
    });
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={transitionSlow}
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-5 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-10 md:grid-cols-2"
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
            style={{ direction: fieldDirection }}
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
        className="rounded-xl bg-[#e0bc80] py-4 font-medium text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>
    </motion.form>
  );
}
