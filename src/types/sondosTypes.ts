/**
 * Types for the Sondos Dyeing page.
 * The API returns this object directly (not wrapped in `{ data: ... }`).
 */
export type SondosSection = {
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

export type SondosData = {
  breadcrumb: SondosSection;
  content: SondosSection;
};

/** Same shape as the API body — returned as a top-level object. */
export type SondosApiResponse = SondosData;
