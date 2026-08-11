"use server";

/**
 * Server action for the contact form.
 * Validates input, then posts to the backend API.
 */
import { sendContactData } from "@/api/contactService";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact.schema";
import { isApiError } from "@/types/layoutTypes";

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

  try {
    const result = await sendContactData(parsed.data);

    if (isApiError(result)) {
      console.error("contactAction: sendContactData failed", result.message);
      return { ok: false, error: "generic_error" };
    }

    return { ok: true };
  } catch (err) {
    console.error("contactAction: unexpected error", err);
    return { ok: false, error: "generic_error" };
  }
}
