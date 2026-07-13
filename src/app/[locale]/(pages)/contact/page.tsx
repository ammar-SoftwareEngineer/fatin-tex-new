import { createPageMetadata, setupPageLocale } from "@/lib/page-utils";
import { fetchContactData } from "@/api/contactService";
import ContactPageView from "@/components/contact/ContactPage";
import { isApiError } from "@/types/layoutTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createPageMetadata(params, "contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await setupPageLocale(params);
  const contactApiData = await fetchContactData(locale);

  return (
    <ContactPageView
      contactData={isApiError(contactApiData) ? null : contactApiData.data}
    />
  );
}
