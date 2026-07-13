import { getLocale } from "next-intl/server";
import { fetchLayoutData } from "@/api/layoutService";
import { isApiError } from "@/types/layoutTypes";
import IconsAction from "./IconsAction";

export default async function FixedContactIcons() {
  const locale = await getLocale();
  const layoutData = await fetchLayoutData(locale);

  const callToAction = isApiError(layoutData)
    ? null
    : layoutData.data?.call_to_actions;

  return (
    <div
      className="
        fixed
        left-3 sm:left-5
        bottom-5 sm:bottom-7
        z-50
        flex
        flex-col
        gap-3 sm:gap-4
      "
    >
      <IconsAction callToAction={callToAction} />
    </div>
  );
}
