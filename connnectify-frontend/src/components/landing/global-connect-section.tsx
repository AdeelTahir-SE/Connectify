"use client";

import { Globe, Users, Star, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    value: "120+",
    label: "Countries",
  },
  {
    icon: <Users className="w-6 h-6 text-purple-400" />,
    value: "10M+",
    label: "Happy Users",
  },
  {
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    value: "4.8",
    label: "User Rating",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    value: "99.9%",
    label: "Uptime",
  },
];

export default function GlobalConnectSection() {
  return (
    <section className="w-full py-24 bg-[#050509]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Connecting the <span className="text-purple-400">world</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Building meaningful connections across the globe
          </p>
        </div>

        {/* Map Visualization placeholder (using CSS grid/dots to simulate) */}
        <div className="relative w-full max-w-5xl h-[400px] mb-16 flex items-center justify-center">
          {/* We use a simple radial gradient and some glowing points to simulate the map in the design */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-50"></div>
          
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Dots to represent map */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Connection nodes */}
            <div className="absolute top-[30%] left-[20%] w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.4)] z-10">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
                <img src="https://i.pravatar.cc/150?img=11" alt="user" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="absolute top-[60%] left-[35%] w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)] z-10">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
                <img src="https://i.pravatar.cc/150?img=12" alt="user" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="absolute top-[40%] right-[30%] w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.4)] z-10">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
                <img src="https://i.pravatar.cc/150?img=13" alt="user" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="absolute top-[70%] right-[20%] w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.4)] z-10">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
                <img src="https://i.pravatar.cc/150?img=14" alt="user" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Connection lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 5px rgba(168,85,247,0.5))' }}>
              <path d="M 20% 30% Q 30% 20% 65% 40%" stroke="rgba(168,85,247,0.5)" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" />
              <path d="M 35% 60% Q 50% 50% 65% 40%" stroke="rgba(168,85,247,0.5)" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" />
              <path d="M 65% 40% Q 75% 50% 80% 70%" stroke="rgba(168,85,247,0.5)" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" />
            </svg>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center bg-white/[0.02] border border-white/5 p-6 rounded-2xl w-40 hover:bg-white/[0.04] transition-colors">
              <div className="mb-4">{stat.icon}</div>
              <h4 className="text-2xl font-bold text-white mb-1">{stat.value}</h4>
              <p className="text-gray-400 text-sm text-center">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
