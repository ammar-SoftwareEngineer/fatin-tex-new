export type LayoutBranding = {
  site_name: string;
  logo: string;
  favicon: string;
};

export type LayoutMenuItem = {
  id: number;
  title: string;
  link?: string | null;
  children: LayoutMenuItem[];
};

export type LayoutFooterLink = {
  title?: string;
  url?: string;
  href?: string;
};

export type LayoutFooter = {
  body: string;
  copyright: string | null;
  links: LayoutFooterLink[];
};

export type SocialLink = {
  platform: string;
  url: string;
};

export type CallToAction = {
  phone: string;
  whatsapp: string;
};

export type LayoutContact = {
  name: string;
  type: string;
  address: string;
  map_url: string;
  map_embed: string;
  phone_1: string;
  phone_1_country_code: string;
  phone_2: string;
  phone_2_country_code: string;
  working_hours: string;
  email: string;
  support_email: string;
};

export type LayoutData = {
  branding: LayoutBranding;
  menu: LayoutMenuItem[];
  footer: LayoutFooter;
  social_links: SocialLink[];
  call_to_actions: CallToAction;
  contact: LayoutContact;
};

export type LayoutApiResponse = {
  data: LayoutData;
};

export type ApiError = { success: false; message: string };

export function isApiError(response: unknown): response is ApiError {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    (response as ApiError).success === false
  );
}

export function formatLayoutPhone(contact?: LayoutContact | null) {
  if (!contact?.phone_1) return "";

  const code = contact.phone_1_country_code?.replace(/\s/g, "") || "";
  const phone = contact.phone_1.replace(/\s/g, "");

  return `${code}${phone}`;
}
