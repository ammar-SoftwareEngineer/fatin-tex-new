/**
 * Shapes returned by `/contact-us`.
 * Optional fields stay optional so the UI can work before the CMS adds them.
 */

export type ContactSection = {
  id: number;
  title: string;
  sub_title: string;
  text: string;
  image: string;
  alt_image: string | null;
  order: number;
  is_active: number;
  button_text: string;
  button_link_url: string | null;
};

export type ContactBranch = {
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
};

/**
 * Department card from the API.
 * CMS may send either `title`/`phone` or branch-style `name`/`phone_1`.
 */
export type ContactDepartment = {
  id?: number | string;
  title?: string | null;
  name?: string | null;
  type?: string | null;
  phone?: string | null;
  phone_country_code?: string | null;
  phone_1?: string | null;
  phone_1_country_code?: string | null;
  email?: string | null;
  order?: number;
  is_active?: number | boolean;
  is_featured?: number | boolean;
};

/** UI-ready department after normalizing API aliases and fallback data. */
export type NormalizedContactDepartment = {
  id: string;
  title: string;
  phone: string;
  phoneHref: string;
  email: string;
  featured: boolean;
  order: number;
};

export type ContactData = {
  breadcrumb: ContactSection | null;
  branches: ContactBranch[];
  departments?: ContactDepartment[] | null;
  departments_section?: Partial<ContactSection> | null;
  form_content: ContactSection | null;
  map_iframe: string | null;
};

export type ContactApiResponse = {
  data: ContactData;
};
