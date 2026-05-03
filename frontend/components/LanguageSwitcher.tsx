"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
    >
        {lang === "en" ? "EN" : "TH"}
    </button>
  );
}