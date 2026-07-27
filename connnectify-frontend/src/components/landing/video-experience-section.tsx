"use client";

import { CheckCircle2, Mic, Video, Monitor, Phone, MessageSquare } from "lucide-react";
import Image from "next/image";

const benefits = [
  "HD video & audio quality",
  "Real-time chat during calls",
  "Screen sharing & presentations",
  "Instant file sharing",
  "AI assistant & chatbot support",
];

export default function VideoExperienceSection() {
  return (
    <section className="w-full py-24 bg-[#050509]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Text & Benefits */}
        <div className="flex flex-col">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Video Call <span className="text-purple-400">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Crystal-clear video, real-time chat and powerful collaboration tools
          </p>

          <ul className="flex flex-col gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0" />
                <span className="text-gray-300 font-medium">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-[#050509]"></div>
              <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-[#050509]"></div>
              <div className="w-10 h-10 rounded-full bg-pink-500 border-2 border-[#050509]"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold">10+</span>
              <span className="text-gray-400 text-xs">Active in calls</span>
            </div>
          </div>
        </div>

        {/* Right Side - UI Mockup */}
        <div className="relative w-full h-[500px] bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-white font-medium">Group Call</span>
            </div>
            <span className="text-gray-400 text-sm">3:14</span>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Video Grid */}
            <div className="flex-1 p-4 grid grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-xl relative overflow-hidden">
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white">Eleanor Pena</div>
              </div>
              <div className="bg-slate-800 rounded-xl relative overflow-hidden">
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white">Dianne Russell</div>
              </div>
              <div className="bg-slate-800 rounded-xl relative overflow-hidden">
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white">Cameron Williamson</div>
              </div>
              <div className="bg-slate-800 rounded-xl relative overflow-hidden">
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white">Theresa Webb</div>
              </div>
            </div>

            {/* Chat Sidebar */}
            <div className="w-64 border-l border-white/10 bg-slate-900/50 flex flex-col">
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <span className="text-white font-medium">Chat</span>
              </div>
              <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
                {/* Chat bubbles placeholder */}
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500 shrink-0"></div>
                  <div className="bg-white/10 p-2 rounded-lg text-xs text-gray-300">Hey everyone! 👋</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 shrink-0"></div>
                  <div className="bg-white/10 p-2 rounded-lg text-xs text-gray-300">Let's start the meeting.</div>
                </div>
                <div className="bg-purple-600/20 border border-purple-500/30 p-2 rounded-lg flex items-center gap-2">
                   <FileText className="w-4 h-4 text-purple-400" />
                   <div className="flex flex-col">
                      <span className="text-xs text-white">Presentation.pdf</span>
                      <span className="text-[10px] text-gray-400">2.4 MB</span>
                   </div>
                </div>
              </div>
              <div className="p-3 border-t border-white/10">
                <div className="bg-black/50 rounded-full px-3 py-2 text-xs text-gray-500">Type a message...</div>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
              <Mic className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
              <Video className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
              <Monitor className="w-5 h-5 text-white" />
            </button>
            <button className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              <Phone className="w-5 h-5 text-white transform rotate-[135deg]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
