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

/** Department cards from `/contact-us` (`data.departments`). */
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

function isActiveFlag(value?: number | boolean | null) {
  if (value === undefined || value === null) return true;
  return value === 1 || value === true;
}

function compactPhone(countryCode?: string | null, phone?: string | null) {
  const code = (countryCode ?? "").replace(/\s/g, "");
  const number = (phone ?? "").replace(/\s/g, "");
  if (!number) return { display: "", href: "" };
  return {
    display: `${code}${number}`,
    href: `tel:${code}${number}`,
  };
}

function normalizeDepartment(
  item: ContactDepartment | ContactBranch,
  index: number,
): NormalizedContactDepartment | null {
  const raw = item as ContactDepartment;
  const title = (raw.title || raw.name || "").trim();
  const email = (raw.email || "").trim();
  const phone = compactPhone(
    raw.phone_country_code || raw.phone_1_country_code,
    raw.phone || raw.phone_1,
  );

  if (!title || (!phone.display && !email) || !isActiveFlag(raw.is_active)) {
    return null;
  }

  return {
    id: String(raw.id ?? `${title}-${index}`),
    title,
    phone: phone.display,
    phoneHref: phone.href,
    email,
    featured: raw.is_featured === 1 || raw.is_featured === true,
    order: Number(raw.order ?? index),
  };
}

/** Prefer `data.departments`; otherwise non-main `data.branches`. */
export function getContactDepartments(
  data?: ContactData | null,
): NormalizedContactDepartment[] {
  const source: Array<ContactDepartment | ContactBranch> = data?.departments?.length
    ? data.departments
    : (data?.branches ?? []).filter((branch) => branch.type && branch.type !== "main");

  return source
    .map((item, index) => normalizeDepartment(item, index))
    .filter((item): item is NormalizedContactDepartment => item !== null)
    .sort((a, b) => a.order - b.order);
}
