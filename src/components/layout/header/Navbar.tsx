
import { fetchLayoutData } from "@/api/layoutService";
import NavbarContent from "./NavbarContent";

  import { getLocale } from "next-intl/server";



export default async function Navbar() {
  const locale = await getLocale();
  const layoutData = await fetchLayoutData(locale);

  return (
    <>
      <NavbarContent layoutData={layoutData} />
    </>
  );
}
