"use client";

import { FaChevronDown } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { LANGUAGES } from "./navTypes";

type LanguageMenuProps = {
  locale: string;
  onSwitch: (code: string) => void;
  variant: "desktop" | "mobile";
};

export default function LanguageMenu({
  locale,
  onSwitch,
  variant,
}: LanguageMenuProps) {
  const t = useTranslations("nav");

  if (variant === "mobile") {
    return (
      <div className="pt-6">
        <p className="text-[#e0bc80] text-lg mb-4">{t("language")}</p>
        <div className="flex gap-3 flex-wrap">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSwitch(lang.code)}
              className={`px-4 py-2 rounded-full border transition ${
                locale === lang.code
                  ? "bg-[#e0bc80] text-black border-[#e0bc80]"
                  : "border-white/20 text-white hover:bg-[#e0bc80] hover:text-black"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 text-white cursor-pointer hover:text-[#e0bc80] transition text-lg">
        {t("language")}
        <FaChevronDown className="text-xs" />
      </div>
      <ul
        className={`absolute ltr:left-0 rtl:right-0 top-full mt-4 w-44 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl
        opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-3
        ${locale === "ar" ? "text-right" : "text-left"}`}
      >
        {LANGUAGES.map((lang) => (
          <li key={lang.code}>
            <button
              type="button"
              onClick={() => onSwitch(lang.code)}
              className={`block w-full px-4 py-2 rounded-xl transition cursor-pointer ${
                locale === lang.code
                  ? "bg-[#e0bc80] text-black"
                  : "text-white hover:bg-[#fddea97e] hover:text-white"
              }`}
            >
              {lang.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
