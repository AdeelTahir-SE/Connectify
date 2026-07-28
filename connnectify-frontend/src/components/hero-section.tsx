"use client";

import { PlayCircle, ShieldCheck, Video, Users, Phone, ScreenShare, FileText } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-[600px] w-full max-w-7xl mx-auto px-6 py-12 md:py-24 overflow-hidden">
      
      {/* Left Column - Text Content */}
      <div className="flex-1 z-10 flex flex-col items-start pt-10 md:pt-0">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-6 border border-blue-100">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
          Connect, Collaborate, Grow Together.
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
          Meet. Talk.<br />
          Collaborate.<br />
          <span className="text-blue-600">Anywhere</span>.
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl max-w-md mb-8">
          Experience crystal-clear video calls, instant matchmaking, and seamless collaboration—all in one beautifully designed platform.
        </p>
        
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <Link href="/signup" className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all clay-btn">
            Get Started
          </Link>
          <button className="px-8 py-3.5 rounded-full bg-white text-gray-700 font-semibold transition-all flex items-center gap-2 clay-btn-white">
            <PlayCircle className="w-5 h-5 text-blue-600" />
            Watch Demo
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            <div className="flex flex-col">
              <span className="font-bold text-gray-900">Secure Calls</span>
              <span className="text-[10px] text-gray-400">End-to-end encrypted</span>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-teal-500" />
            <div className="flex flex-col">
              <span className="font-bold text-gray-900">HD Video</span>
              <span className="text-[10px] text-gray-400">Crystal clear quality</span>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            <div className="flex flex-col">
              <span className="font-bold text-gray-900">10M+ Connections</span>
              <span className="text-[10px] text-gray-400">People trust Connectify</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Visual Composition */}
      <div className="flex-1 relative w-full h-[500px] md:h-[600px] mt-16 md:mt-0 flex justify-center items-center">
        
        {/* Abstract Background Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-50 to-purple-50 opacity-50 blur-3xl -z-10"></div>
        <div className="absolute top-[10%] right-[10%] w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>
        <div className="absolute bottom-[20%] left-[10%] w-2 h-2 rounded-full bg-purple-400"></div>

        {/* Central Main Avatar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-white shadow-2xl bg-blue-100 overflow-hidden z-20">
          <img src="https://i.pravatar.cc/300?img=11" alt="Main user" className="w-full h-full object-cover" />
        </div>

        {/* Floating Avatars & UI Elements */}
        
        {/* Top Right Avatar */}
        <div className="absolute top-[10%] right-[15%] w-36 h-36 rounded-full border-4 border-white shadow-xl bg-pink-100 overflow-hidden z-10">
          <img src="https://i.pravatar.cc/300?img=5" alt="User 2" className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold z-30">
            • Live
          </div>
        </div>

        {/* Bottom Right Avatar */}
        <div className="absolute bottom-[15%] right-[5%] w-32 h-32 rounded-full border-4 border-white shadow-xl bg-teal-100 overflow-hidden z-10">
          <img src="https://i.pravatar.cc/300?img=47" alt="User 3" className="w-full h-full object-cover" />
        </div>

        {/* Floating UI: Incoming Call */}
        <div className="absolute top-[25%] left-[10%] bg-white rounded-xl shadow-lg p-3 flex items-center gap-3 z-30 animate-bounce" style={{ animationDuration: '3s' }}>
          <img src="https://i.pravatar.cc/100?img=12" alt="Caller" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-medium">Incoming Call</span>
            <span className="text-sm font-bold text-gray-900">Alex Johnson</span>
          </div>
          <div className="flex gap-2 ml-2">
            <button className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white"><Phone className="w-3 h-3 rotate-[135deg]" /></button>
            <button className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white"><Phone className="w-3 h-3" /></button>
          </div>
        </div>

        {/* Floating UI: 10 Participants */}
        <div className="absolute top-[35%] right-[0%] bg-white rounded-xl shadow-lg p-3 flex flex-col z-30">
          <span className="text-xs font-bold text-gray-900 mb-1">10 <span className="font-normal text-gray-500">Participants</span></span>
          <div className="flex -space-x-2">
            <img src="https://i.pravatar.cc/100?img=1" className="w-6 h-6 rounded-full border-2 border-white" alt="p1"/>
            <img src="https://i.pravatar.cc/100?img=2" className="w-6 h-6 rounded-full border-2 border-white" alt="p2"/>
            <img src="https://i.pravatar.cc/100?img=3" className="w-6 h-6 rounded-full border-2 border-white" alt="p3"/>
            <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-600">+7</div>
          </div>
        </div>

        {/* Floating UI: Screen Sharing */}
        <div className="absolute bottom-[35%] left-[20%] bg-white rounded-xl shadow-lg p-3 flex items-center gap-3 z-30">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <ScreenShare className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-medium">Screen Sharing</span>
            <span className="text-xs font-bold text-blue-600">You are sharing</span>
          </div>
        </div>

        {/* Floating UI: Files Shared */}
        <div className="absolute bottom-[10%] right-[30%] bg-white rounded-xl shadow-lg p-3 flex items-center gap-3 z-30">
          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-medium">Files shared</span>
            <span className="text-xs font-bold text-gray-900">Presentation.pdf</span>
          </div>
        </div>

        {/* Connection Lines (SVGs for dotted lines between avatars) */}
        <svg className="absolute inset-0 w-full h-full -z-0" pointerEvents="none">
           <path d="M 180 300 Q 250 200 350 150" fill="none" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
           <path d="M 350 300 Q 400 400 380 450" fill="none" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* Floating Camera icon */}
        <div className="absolute top-[45%] right-[25%] w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center z-20 shadow-blue-500/40">
           <Video className="w-5 h-5" />
        </div>

        {/* Emoticons */}
        <div className="absolute top-[20%] right-[5%] text-2xl animate-bounce" style={{ animationDuration: '4s' }}>😍</div>
        <div className="absolute bottom-[40%] right-[15%] text-xl">👍</div>

      </div>
    </section>
  );
}
