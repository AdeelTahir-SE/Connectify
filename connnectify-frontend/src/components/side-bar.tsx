"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
  Home,
  User,
  Users,
  Shuffle,
  UserRoundXIcon,
  Menu,
  X,
} from "lucide-react";
import { signout } from "@/db/users";
import { useUser } from "@/utils/context";

export default function SideBar() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const menu = [
    { text: "Dashboard", link: "/dashboard", icon: Home, minTier: "free" },
    {
      text: "1:1 Chat",
      link: "/dashboard/single-chat-room",
      icon: User,
      minTier: "free",
    },
    {
      text: "Group Chat",
      link: "/dashboard/multi-person-chat-room",
      icon: Users,
      minTier: "pro",
    },
    {
      text: "Random Match",
      link: "/dashboard/random-video-room",
      icon: Shuffle,
      minTier: "enterprise",
    },
  ] as const;

  const tierRank = { free: 0, pro: 1, enterprise: 2 } as const;
  const currentRank = tierRank[user?.tier as keyof typeof tierRank] ?? 0;

  /* sign‑out */
  async function handleSignOut() {
    try {
      await signout();
      window.location.href = "/";
    } catch (err) {
      console.error("Error signing out:", err);
    }
  }

  /* shared list */
  const NavLinks = () => (
    <>
      {menu
        .filter(({ minTier }) => currentRank >= tierRank[minTier])
        .map(({ text, link, icon: Icon }) => (
          <Link
            key={text}
            href={link}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-900 transition"
          >
            <Icon className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-purple-100">{text}</span>
          </Link>
        ))}

      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-900 transition"
      >
        <UserRoundXIcon className="w-5 h-5 text-purple-500" />
        <span className="text-sm font-medium text-purple-100">Sign out</span>
      </button>
    </>
  );

  /* ––– JSX ––– */
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col items-center min-h-screen w-56 bg-[#00012c] p-6">
        <h1 className="mb-8 text-2xl font-bold text-purple-600">Connectify</h1>
        <nav className="flex flex-col gap-3 w-full">
          <NavLinks />
        </nav>
      </aside>

      {/* Mobile top bar */}
      <header className="flex md:hidden items-center justify-between min-w-full bg-[#00012c] px-4 py-3">
        <h1 className="text-lg flex flex-row items-center justify-center font-bold text-purple-600">
          <Image
            src="/star-shine.svg"
            width={50}
            height={50}
            alt="Logo"
            priority
          />
          Connectify
        </h1>
        <button onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6 text-purple-600" />
        </button>
      </header>

      {/* Slide‑in drawer for mobile */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden">
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#00012c] p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-purple-600">Menu</h2>
              <button onClick={() => setOpen(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <nav className="flex flex-col gap-3">
              <NavLinks />
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
