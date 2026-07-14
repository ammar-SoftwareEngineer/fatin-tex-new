"use client";

import type { fetchLayoutData } from "@/api/layoutService";
import siteData from "@/lib/data/site.json";
import {
  formatLayoutPhone,
  isApiError,
  type LayoutData,
} from "@/types/layoutTypes";
import FooterBackground from "./FooterBackground";
import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterCopyright from "./FooterCopyright";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";
import type { FooterLinkItem } from "./types";

type FooterClientProps = {
  layoutData: Awaited<ReturnType<typeof fetchLayoutData>>;
};

export default function FooterClient({ layoutData }: FooterClientProps) {
  const layout: LayoutData | null = isApiError(layoutData)
    ? null
    : layoutData.data;

  const contact = {
    address: layout?.contact?.address ?? siteData.contact.address,
    phone: formatLayoutPhone(layout?.contact) || siteData.contact.phone,
    email: layout?.contact?.email ?? siteData.contact.email,
  };

  const logo = layout?.branding?.logo || "/logo.png";
  const description = layout?.footer?.body?.trim();

  const footerLinks =
    layout?.footer?.links?.map((item) => ({
      name: item.title,
      href: item.href,
    })) ?? [];

  return (
    <footer className="relative overflow-hidden text-white">
      <FooterBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col items-center text-center">
          <FooterBrand logo={logo} description={description} />
          <FooterLinks links={footerLinks as FooterLinkItem[]} />
          <FooterSocial socialLinks={layout?.social_links ?? []} />
          <FooterContact contact={contact} />
          <FooterCopyright copyright={layout?.footer?.copyright} />
        </div>
      </div>
    </footer>
  );
}
