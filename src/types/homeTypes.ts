export type HeroSlide = {
  id: number;
  title: string;
  sub_title: string;
  text: string;
  button_text: string;
  button_link_url: string | null;
  image: string;
  alt_image: string | null;
  order: number;
  is_active: number;
};

export type HomeSection = {
  id: number;
  title: string;
  sub_title: string;
  text: string;
  image: string;
  alt_image: string | null;
  order: number;
  is_active: number;
  button_text?: string;
  button_link_url?: string | null;
};

/** Single category item inside categories_section.categories */
export type ImageItem = {
  id: number;
  url: string;
};

export type Product = {
  id: number;
  name: string;
  short_description: string;
  description: string;
  price: number;
  quantity: number | null;
  is_active: number;
  status: string;
  sort_order: number;
  main_image: string;
  images: ImageItem[];
  slug: {
    en: string;
    ar: string;
  };
};

export type HomeCategory = {
  id: number;
  name: string;
  short_text: string;
  text: string;
  image: string;
  alt_image: string | null;
  order: number;
  is_active: boolean;
  show_in_navbar: boolean;
  show_in_footer: boolean;
  is_main_section: boolean;

  images: ImageItem[];

  slug: {
    en: string;
    ar: string;
  };

  children: HomeCategory[];

  products: Product[];
};

export type CategoriesSection = HomeSection & {
  categories: HomeCategory[];
};
export type HomeBlog = {
  id: number;
  title: string;
  slug: Record<string, string>;
  image?: string;
  short_text?: string;
};

export type HomeData = {
  hero: HeroSlide[];
  about_us: HomeSection;
  categories_section: CategoriesSection;
  video_section: HomeSection;
  why_choose_us_section: HomeSection & { benefits: unknown[] };
  blogs_section: HomeSection & { blogs: HomeBlog[] };
};
