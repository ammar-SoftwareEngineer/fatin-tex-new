export type ContactBranch = {
  name: string;
  type: string;
  address: string;
  map_url: string;
  map_embed: string;
  phone?: string;
  email?: string;
};

export type ContactData = {
  breadcrumb: unknown;
  branches: ContactBranch[];
};
