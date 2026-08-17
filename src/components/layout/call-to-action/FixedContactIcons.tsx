import { getLocale } from "next-intl/server";
import { fetchLayoutData } from "@/api/layoutService";
import { isApiError, type LayoutApiResponse } from "@/types/layoutTypes";
import IconsAction from "./IconsAction";

export default async function FixedContactIcons() {
  const locale = await getLocale();
  const layoutData = await fetchLayoutData(locale);

  const callToAction = isApiError(layoutData)
    ? null
    : (layoutData as LayoutApiResponse).data?.call_to_actions;

  return (
    <div className="fixed bottom-5 left-3 z-50 flex flex-col gap-3 sm:bottom-7 sm:left-5 sm:gap-4">
      <IconsAction callToAction={callToAction} />
    </div>
  );
}
