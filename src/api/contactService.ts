/**
 * Contact page data fetch + contact form submission.
 */
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export async function fetchContactData(lang = "en") {
  try {
    const response = await fetch(`${BASE_URL}/contact-us?lang=${lang}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": lang },
      method: "GET",
      next: { revalidate: 5 },
    });
    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Contact data fetch error:", message);
    return { success: false, message };
  }
}

export async function sendContactData(formData: ContactFormData) {
  try {
    const response = await fetch(`${BASE_URL}/contact-us`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Contact form submission error:", message);
    return { success: false, message };
  }
}
