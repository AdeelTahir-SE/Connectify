"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-[600px] py-20 overflow-hidden bg-[#050509]">
      {/* Background Particles/Stars */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] opacity-60"></div>
        <div className="absolute top-[40%] right-[30%] w-1.5 h-1.5 bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899] opacity-80"></div>
        <div className="absolute bottom-[30%] left-[40%] w-2.5 h-2.5 bg-purple-400 rounded-full shadow-[0_0_12px_#c084fc] opacity-50"></div>
        {/* Add a subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-[#050509] to-[#050509]"></div>
      </div>

      {/* Glowing Neon Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border-[15px] md:border-[25px] border-purple-600/30 shadow-[0_0_80px_rgba(147,51,234,0.6),inset_0_0_80px_rgba(147,51,234,0.6)] z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border-[4px] md:border-[8px] border-purple-400 opacity-80 shadow-[0_0_20px_rgba(192,132,252,1),inset_0_0_20px_rgba(192,132,252,1)] z-0 mix-blend-screen"></div>

      {/* Floating Avatars */}
      <div className="absolute z-10 hidden lg:flex flex-col gap-4 right-[15%] top-[25%]">
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">EP</div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">Eleanor Pena</span>
            <span className="text-gray-400 text-xs">New York, USA</span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg translate-x-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">DS</div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">Dianne Russell</span>
            <span className="text-gray-400 text-xs">London, UK</span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">CW</div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">Cameron Williamson</span>
            <span className="text-gray-400 text-xs">Tokyo, Japan</span>
          </div>
        </div>
      </div>

      <div className="absolute z-10 hidden lg:flex flex-col gap-4 left-[15%] top-[35%]">
        <div className="w-16 h-16 rounded-full bg-purple-900/50 backdrop-blur-md border border-purple-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          <Image src="/star-shine.svg" alt="Star" width={30} height={30} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto mt-10">
        <h1 className="text-6xl md:text-8xl lg:text-[110px] font-extrabold text-white tracking-tight leading-none mb-6 text-glow-primary">
          CONNECTIFY
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl">
          Explore the world and let them join you
        </p>
        
        <Link 
          href="/dashboard"
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_50px_rgba(147,51,234,0.6)]"
        >
          <span className="relative z-10">Get Started</span>
          <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </div>
    </section>
  );
}
