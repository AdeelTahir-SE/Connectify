"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RandomMatchSection() {
  return (
    <section className="w-full py-12 bg-[#050509]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[400px]">
        {/* Random Match Card */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 flex flex-col justify-center relative overflow-hidden group hover:border-purple-500/30 transition-colors">
          <div className="relative z-10 flex flex-col items-start h-full justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Random Match
            </h2>
            <p className="text-gray-400 mb-8 max-w-xs">
              Discover new people and make genuine connections
            </p>
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-full transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]"
            >
              Try Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Abstract Illustration representation */}
          <div className="absolute right-0 bottom-0 w-64 h-64 opacity-50 md:opacity-100 flex items-end justify-end pointer-events-none">
            {/* Globe placeholder */}
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full border border-blue-500/40 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]"></div>
            <div className="absolute bottom-5 right-20 w-16 h-24 bg-purple-500/20 rounded-t-full border border-purple-500/40"></div>
            <div className="absolute bottom-5 right-2 w-16 h-20 bg-pink-500/20 rounded-t-full border border-pink-500/40"></div>
          </div>
        </div>

        {/* AI Assistant Card (I'll extract this into its own section/component to match the design's side-by-side layout but I'll implement them separately in the page structure, wait, the design shows them as two separate side-by-side cards in the same row) */}
        {/* Let's actually put AI Assistant in the same file to match the layout perfectly */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 flex flex-col justify-center relative overflow-hidden group hover:border-purple-500/30 transition-colors">
          <div className="relative z-10 flex flex-col items-start h-full justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              AI Assistant
            </h2>
            <p className="text-gray-400 mb-8 max-w-xs">
              Your smart companion for every conversation
            </p>
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-full transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]"
            >
              Chat Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Abstract Illustration representation */}
          <div className="absolute right-0 bottom-0 w-64 h-64 opacity-50 md:opacity-100 flex items-center justify-center pointer-events-none">
            {/* Robot placeholder */}
            <div className="absolute bottom-10 right-10 w-28 h-28 rounded-full border-4 border-purple-500/50 bg-slate-800 shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center">
              <div className="w-16 h-10 bg-black rounded-full flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_5px_#22d3ee]"></div>
                <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_5px_#22d3ee]"></div>
              </div>
            </div>
            {/* Chat bubbles */}
            <div className="absolute top-16 right-32 w-12 h-8 rounded-full bg-purple-600/40 border border-purple-500/30"></div>
            <div className="absolute top-10 right-10 w-10 h-10 rounded-full bg-pink-600/40 border border-pink-500/30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
