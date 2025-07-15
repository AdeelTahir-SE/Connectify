"use client";

import Link from "next/link";
import {
  Home,
  User,
  Users,
  Shuffle,
  UserRoundXIcon,
} from "lucide-react";
import { signout } from "@/db/users";
import { useUser } from "@/utils/context";

export default function SideBar() {
  const  {user}  = useUser();            
  const menu = [
    { text: "Dashboard", link: "/dashboard", icon: Home, minTier: "free" },
    { text: "1:1 Chat", link: "/dashboard/single-chat-room", icon: User, minTier: "free" },
    { text: "Group Chat", link: "/dashboard/multi-person-chat-room", icon: Users, minTier: "pro" },
    { text: "Random Match", link: "/dashboard/random-video-room", icon: Shuffle, minTier: "enterprise" },
  ] as const;

  const tierRank: Record<"free" | "pro" | "enterprise", number> = {
    free: 0,
    pro: 1,
    enterprise: 2,
  };
  const currentRank = tierRank[user?.tier as keyof typeof tierRank] ?? 0;

  const handleSignOut = async () => {
    try {
      await signout();
      window.location.href = "/";
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <aside className="flex flex-col items-center min-h-screen bg-[#00012c] p-8">
      <h1 className="text-2xl font-bold text-purple-600 mb-8">Connectify</h1>

      <nav className="flex flex-col gap-3 w-full max-w-[200px]">
        {menu
          .filter(({ minTier }) => currentRank >= tierRank[minTier])
          .map(({ text, link, icon: Icon }) => (
            <Link
              key={text}
              href={link}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-900 transition-colors"
            >
              <Icon className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-semibold text-purple-100">
                {text}
              </span>
            </Link>
          ))}

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-900 transition-colors"
        >
          <UserRoundXIcon className="w-6 h-6 text-purple-600" />
          <span className="text-sm font-semibold text-purple-100">Sign out</span>
        </button>
      </nav>
    </aside>
  );
}
