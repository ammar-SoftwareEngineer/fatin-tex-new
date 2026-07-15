"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

type FooterBrandProps = {
  logo: string;
  description?: string;
};

export default function FooterBrand({ logo, description }: FooterBrandProps) {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");

  return (
    <div className="mb-8">
      <div className="relative h-24 sm:h-28 lg:h-32 w-40 mx-auto mb-4">
        <Image
          src={logo}
          alt={tCommon("brandName")}
          fill
          sizes="160px"
          className="object-contain"
          loading="lazy"
        />
      </div>

      <h3 className="text-xl sm:text-2xl font-semibold mb-2">
        {tCommon("brandName")}
      </h3>

      <p className="text-gray-300 text-sm sm:text-base max-w-md leading-7 whitespace-pre-line">
        {description || t("description")}
      </p>
    </div>
  );
}
