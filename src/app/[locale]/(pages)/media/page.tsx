import { redirect } from "@/i18n/navigation";
import { setupPageLocale } from "@/lib/page-utils";

export default async function MediaIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await setupPageLocale(params);
  redirect({ href: "/media/images", locale });
}
