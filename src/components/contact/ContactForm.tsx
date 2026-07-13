"use client";

import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { contactAction } from "@/actions/contact";
import type { ContactFormValues } from "@/lib/validation/contact.schema";

const inputClassName =
  "p-4 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-[#e0bc80] w-full";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const data: ContactFormValues = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    startTransition(async () => {
      const result = await contactAction(data);
      const form = event.currentTarget;

      if (!result.ok) {
        setStatus("error");
        setErrorMessage(result.error);
        return;
      }

      setStatus("success");
      form.reset();
    });
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[28px] p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <input
        name="name"
        type="text"
        required
        placeholder={t("name")}
        className={inputClassName}
      />
      <input
        name="email"
        type="email"
        required
        placeholder={t("email")}
        className={inputClassName}
      />
      <input
        name="subject"
        type="text"
        placeholder={t("subject")}
        className={`md:col-span-2 ${inputClassName}`}
      />
      <textarea
        name="message"
        required
        placeholder={t("message")}
        rows={6}
        className={`md:col-span-2 ${inputClassName}`}
      />

      {status === "success" && (
        <p className="md:col-span-2 text-center text-[#e0bc80] text-sm">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p className="md:col-span-2 text-center text-red-400 text-sm">
          {errorMessage || t("error")}
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
