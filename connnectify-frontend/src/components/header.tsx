"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import RegisterationModal from "./registeration-modal";
import Image from "next/image";
import { useUser } from "@/utils/context";
import { Star } from "lucide-react";

export default function Header() {
  const [isModalActive, setIsModalActive] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {user} = useUser();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        isModalActive &&
        modalRef.current &&
        !modalRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsModalActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-between w-full text-white px-6 py-4 md:px-12 border-b border-white/5">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-purple-900/40">
           <Star className="w-5 h-5 text-purple-400 fill-purple-400" />
        </div>
        <span className="font-bold text-xl tracking-wide">Connectify</span>
      </Link>

      {/* Nav Links - Desktop */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
        <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
        <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
        <li><Link href="#docs" className="hover:text-white transition-colors">Docs</Link></li>
      </ul>

      {/* Auth / Profile */}
      <div className="flex items-center">
        {user?.name ? (
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-purple-400 transition-colors"
          >
            {user?.name?.substring(0, 15)}{user?.name?.length > 15 ? '...' : ''}
          </Link>
        ) : (
          <button
            ref={buttonRef}
            onClick={() => setIsModalActive((prev) => !prev)}
            className="px-5 py-2 rounded-full text-sm font-semibold border border-purple-500/50 hover:bg-purple-900/30 hover:border-purple-400 transition-all text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            Signup
          </button>
        )}
      </div>

      {isModalActive && (
        <div
          ref={modalRef}
          className="absolute top-full right-4 mt-2 w-[350px] bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 p-4"
        >
          <RegisterationModal />
        </div>
      )}
    </nav>
  );
}
