"use server";

import { sendContactData } from "@/api/contactService";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact.schema";

export type ContactActionResult =
  | { ok: true }
  | { ok: false; error: string };

export async function contactAction(
  data: ContactFormValues,
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  const result = await sendContactData(parsed.data);

  if (!result.success) {
    return { ok: false, error: result.message };
  }

  return { ok: true };
}
