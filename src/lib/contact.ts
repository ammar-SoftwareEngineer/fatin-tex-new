/**
 * Contact page helpers for departments, phone, and map iframe.
 */
import type {
  ContactBranch,
  ContactData,
  ContactDepartment,
  NormalizedContactDepartment,
} from "@/types/contactTypes";

const MAIN_BRANCH_TYPE = "main";

export type FallbackDepartmentKey = "technical" | "sales" | "finance";

type FallbackDepartment = {
  id: FallbackDepartmentKey;
  phone: string;
  displayPhone: string;
  email: string;
  featured?: boolean;
};

const FALLBACK_DEPARTMENTS: FallbackDepartment[] = [
  {
    id: "technical",
    phone: "+201277533059",
    displayPhone: "+201277533059",
    email: "Fateen@fatintex.com",
  },
  {
    id: "sales",
    phone: "+20100181222",
    displayPhone: "+20 100 181 222",
    email: "sales@fatintex.com",
    featured: true,
  },
  {
    id: "finance",
    phone: "+201288466281",
    displayPhone: "+201288466281",
    email: "Mohammed@fatintex.com",
  },
];

export function formatPhone(
  countryCode?: string | null,
  phone?: string | null,
) {
  const code = (countryCode ?? "").replace(/\s/g, "");
  const number = (phone ?? "").replace(/\s/g, "");

  if (!number) return { display: "", href: "" };

  return {
    display: `${code} ${number}`.trim(),
    href: `tel:${code}${number}`,
  };
}

export function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function extractIframeSrc(iframeHtml?: string | null) {
  if (!iframeHtml) return "";
  return iframeHtml.match(/src="([^"]+)"/)?.[1] ?? "";
}

export function getMainBranch(data?: ContactData | null) {
  if (!data?.branches?.length) return undefined;

  return (
    data.branches.find((branch) => branch.type === MAIN_BRANCH_TYPE) ??
    data.branches[0]
  );
}

function isActive(flag?: number | boolean | null) {
  if (flag == null) return true;
  return flag === true || flag === 1;
}

function normalizeDepartment(
  item: ContactDepartment,
  index: number,
): NormalizedContactDepartment | null {
  const title = (item.title || item.name || "").trim();
  const email = (item.email || "").trim();
  const phone = formatPhone(
    item.phone_country_code || item.phone_1_country_code,
    item.phone || item.phone_1,
  );

  if (!isActive(item.is_active) || !title || (!phone.display && !email)) {
    return null;
  }

  return {
    id: String(item.id ?? `${title}-${index}`),
    title,
    phone: phone.display,
    phoneHref: phone.href,
    email,
    featured: item.is_featured === true || item.is_featured === 1,
    order: Number(item.order ?? index),
  };
}

export function getApiDepartments(
  data?: ContactData | null,
): NormalizedContactDepartment[] {
  const fromApi = data?.departments ?? [];
  const source = fromApi.length
    ? fromApi
    : (data?.branches ?? []).filter(
        (branch) => branch.type && branch.type !== MAIN_BRANCH_TYPE,
      );

  return source
    .map(normalizeDepartment)
    .filter((item): item is NormalizedContactDepartment => item !== null)
    .sort((a, b) => a.order - b.order);
}

export function getFallbackDepartments(
  translateTitle: (key: FallbackDepartmentKey) => string,
): NormalizedContactDepartment[] {
  return FALLBACK_DEPARTMENTS.map((department, index) => ({
    id: department.id,
    title: translateTitle(department.id),
    phone: department.displayPhone,
    phoneHref: `tel:${department.phone}`,
    email: department.email,
    featured: Boolean(department.featured),
    order: index,
  }));
}
