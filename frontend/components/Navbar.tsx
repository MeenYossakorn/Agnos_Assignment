"use client";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import AgnosLogo from "../../src/Image/Agnos_logo.png";


export default function Navbar() {
  return (
    <nav className="w-full px-6 py-2 
                bg-gradient-to-br from-[#8EB6EA] to-[#1C60BF]
                flex items-center justify-between
                sticky top-0 z-50 shadow-md">
      
      {/* Logo */}
    <div className="flex items-center">
        <Image
        src={AgnosLogo}
        alt="Agnos Logo"
        width={60}
        height={40}
        className="object-contain border-2 border-[#1C60BF] rounded-md"
        priority
        />
        <p className="ml-3 font-bold text-xl text-white">Patient Form</p>
    </div>

      

      
      <div className="flex items-center gap-4 hover:scale-105 hover:-translate-y-0.5  duration-200 border-2 border-[#1C60BF] rounded-xl">
        <LanguageSwitcher />
      </div>

    </nav>
  );
}