export type AboutSection = {
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

export type StatisticsSection = AboutSection;

export type ValuesSection = AboutSection;

export type AboutData = {
  breadcrumb_section: AboutSection;
  about_us_section: AboutSection | null;
  statistics_section: StatisticsSection[];
  values_section: ValuesSection[];
};

export type AboutApiResponse = {
  data: AboutData;
};
