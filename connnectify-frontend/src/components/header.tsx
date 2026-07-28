"use client";

import Link from "next/link";
import { useUser } from "@/utils/context";

export default function Header() {
  const {user} = useUser();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md flex items-center justify-between w-full text-black px-6 py-4 md:px-12 border-b border-gray-100">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
           C
        </div>
        <span className="font-bold text-xl tracking-wide uppercase">Connectify</span>
      </Link>

      {/* Nav Links - Desktop */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <li><Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link></li>
        <li><Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
        <li><Link href="#about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
        <li><Link href="#blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
        <li><Link href="#contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
      </ul>

      {/* Auth / Profile */}
      <div className="flex items-center gap-4">
        {user?.name ? (
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            {user?.name?.substring(0, 15)}{user?.name?.length > 15 ? '...' : ''}
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 transition-all border border-transparent clay-btn-white"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all clay-btn"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
