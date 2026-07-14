export type ProductImage = {
  id: number;
  url: string;
};

export type ProductCategory = {
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
  images: ProductImage[];
  slug: {
    en: string;
    ar: string;
  };
  children?: ProductCategory[];
  products?: unknown[];
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
  images: ProductImage[];
  slug: {
    en: string;
    ar: string;
  };
  category: ProductCategory;
};
export type ProductDetailsData = {
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
  images: ProductImage[];
  slug: {
    en: string;
    ar: string;
  };
  category: ProductCategory;
};

export type ProductsApiResponse = {
  data: Product[];
};

export type ProductDetailsApiResponse = {
  data: Product;
};
