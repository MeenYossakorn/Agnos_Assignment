"use client";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { code: "en", label: "English"},
    { code: "th", label: "Thai"},
  ];

  const current = options.find((o) => o.code === lang);

  return (
    <div ref={ref} className="relative inline-block text-left">
      
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white  hover:bg-gray-100 transition"
      >
        <span className="text-sm font-medium">{current?.label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-40 origin-top-right rounded-xl bg-white  transition-all border-2 border-[#1C60BF]  duration-200
        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {options.map((option) => (
          <button
            key={option.code}
            onClick={() => {
              setLang(option.code as "en" | "th");
              setOpen(false);
            }}
            className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-300 transition rounded-xl
              ${lang === option.code ? "bg-gray-100 font-semibold" : ""}`}
          >
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}