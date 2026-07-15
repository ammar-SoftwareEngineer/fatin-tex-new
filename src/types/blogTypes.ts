export type Blog = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  alt_image: string | null;
  order: number;
  is_active: boolean;
  published_at: string;
  slug: {
    en: string;
    ar: string;
    tr?: string;
  };
};

export type RelatedBlog = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  alt_image: string | null;
  order: number;
  is_active: boolean;
  published_at: string;
  slug: {
    en: string;
    ar: string;
    tr?: string;
  };
};

export type BlogsApiResponse = {
  data: Blog[];
};

export type BlogDetailsData = Blog & {
  related_blogs: RelatedBlog[];
};

export type BlogDetailsApiResponse = {
  data: BlogDetailsData;
};
