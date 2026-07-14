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

export type ContactData = {
  breadcrumb: ContactSection | null;
  branches: ContactBranch[];
  form_content: ContactSection | null;
  map_iframe: string | null;
};

export type ContactApiResponse = {
  data: ContactData;
};
