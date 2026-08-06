"use client";

/**
 * Footer content: brand, links, social, contact, copyright.
 * Links come from the same layout menu as the header (dynamic + navigable).
 */
import type { fetchLayoutData } from "@/api/layoutService";
import siteData from "@/lib/data/site.json";
import {
  formatLayoutPhone,
  isApiError,
  type LayoutData,
} from "@/types/layoutTypes";
import { resolveLink } from "@/components/layout/header/navUtils";
import FooterBackground from "./FooterBackground";
import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterCopyright from "./FooterCopyright";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";
import Container from "@/components/common/Container";
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

  // Same menu as the header → same pages when you click
  const menuLinks: FooterLinkItem[] = (layout?.menu ?? [])
    .filter((item) => item.title)
    .map((item) => ({
      name: item.title,
      href: resolveLink(item),
    }));

  // Fallback if menu is empty
  const apiFooterLinks: FooterLinkItem[] =
    layout?.footer?.links
      ?.filter((item) => item.title)
      .map((item) => ({
        name: item.title!,
        href: resolveLink(item),
      })) ?? [];

  const footerLinks = menuLinks.length > 0 ? menuLinks : apiFooterLinks;

  return (
    <footer className="relative overflow-hidden text-white">
      <FooterBackground />

      <Container className="relative z-10 py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col items-center text-center">
          <FooterBrand logo={logo} description={description} />
          <FooterLinks links={footerLinks} />
          <FooterSocial socialLinks={layout?.social_links ?? []} />
          <FooterContact contact={contact} />
          <FooterCopyright copyright={layout?.footer?.copyright} />
        </div>
      </Container>
    </footer>
  );
}
