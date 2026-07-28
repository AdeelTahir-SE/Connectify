"use client";

import { Star } from "lucide-react";

export default function GlobalConnectSection() {
  return (
    <section className="w-full bg-[#11133c] relative overflow-hidden py-24">
      {/* Map Background with Dots */}
      <div className="absolute inset-0 opacity-40 pointer-events-none flex items-center justify-center">
        <div className="w-[120%] h-[120%] bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain opacity-20 filter invert"></div>
      </div>
      
      {/* Connecting curves and nodes (Simulated via SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
         <path d="M 20% 50% Q 40% 20% 60% 40% T 80% 30%" fill="none" stroke="url(#gradientLine)" strokeWidth="1.5" className="opacity-50" />
         <path d="M 30% 60% Q 50% 80% 70% 50%" fill="none" stroke="url(#gradientLine)" strokeWidth="1.5" className="opacity-50" />
         <defs>
           <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
             <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
             <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
           </linearGradient>
         </defs>
      </svg>
      
      {/* Glowing Nodes */}
      <div className="absolute top-[40%] left-[60%] w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_15px_#ec4899] z-20"></div>
      <div className="absolute top-[30%] right-[20%] w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_#eab308] z-20"></div>
      <div className="absolute bottom-[40%] left-[30%] w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] z-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-30">
        <div className="flex flex-col md:flex-row justify-between items-center h-full min-h-[300px]">
          
          {/* Left Stats */}
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-48 text-center shadow-2xl">
              <h3 className="text-4xl font-bold text-white mb-1">120+</h3>
              <p className="text-xs text-indigo-200 font-medium uppercase tracking-wider">Countries</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-48 text-center shadow-2xl">
              <h3 className="text-4xl font-bold text-white mb-1">10M+</h3>
              <p className="text-xs text-indigo-200 font-medium uppercase tracking-wider">Calls Connected</p>
            </div>
          </div>

          {/* Right Stats */}
          <div className="flex flex-col gap-6 w-full md:w-auto mt-6 md:mt-0">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-48 text-center shadow-2xl">
              <div className="flex items-center justify-center gap-1 mb-1">
                <h3 className="text-4xl font-bold text-white">4.8</h3>
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 mb-1" />
              </div>
              <p className="text-xs text-indigo-200 font-medium uppercase tracking-wider">User Rating</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-48 text-center shadow-2xl">
              <h3 className="text-4xl font-bold text-white mb-1">99.9%</h3>
              <p className="text-xs text-indigo-200 font-medium uppercase tracking-wider">Uptime</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
