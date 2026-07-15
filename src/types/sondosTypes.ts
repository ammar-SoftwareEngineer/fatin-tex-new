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

export type SondosApiResponse = {
  data: SondosData;
};
