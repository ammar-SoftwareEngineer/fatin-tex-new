/**
 * Contact page data fetch + contact form submission.
 */
import { fetchJson } from "./fetchJson";

const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export async function fetchContactData(lang = "en") {
  try {
    return await fetchJson(`${NEXT_PUBLIC_BACKEND_BASE_URL}/contact-us?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 5 },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Contact data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function sendContactData(formData: ContactFormData) {
  try {
    return await fetchJson(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/contact-us`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Contact form submission error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
