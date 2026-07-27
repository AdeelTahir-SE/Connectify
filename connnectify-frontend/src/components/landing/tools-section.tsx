"use client";

import { FolderUp, MonitorUp, SmilePlus, Users } from "lucide-react";

const tools = [
  {
    icon: <FolderUp className="w-8 h-8 text-purple-400" />,
    title: "Share Files",
    description: "Instantly share files securely in calls",
    iconBg: "bg-purple-900/40 border-purple-500/30",
  },
  {
    icon: <MonitorUp className="w-8 h-8 text-blue-400" />,
    title: "Screen Share",
    description: "Present your ideas in real-time",
    iconBg: "bg-blue-900/40 border-blue-500/30",
  },
  {
    icon: <SmilePlus className="w-8 h-8 text-orange-400" />,
    title: "Live Reactions",
    description: "React with emojis and have fun",
    iconBg: "bg-orange-900/40 border-orange-500/30",
  },
  {
    icon: <Users className="w-8 h-8 text-emerald-400" />,
    title: "Team Collaboration",
    description: "Work together and get more done",
    iconBg: "bg-emerald-900/40 border-emerald-500/30",
  }
];

export default function ToolsSection() {
  return (
    <section className="w-full py-24 bg-[#050509]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Work, share, collaborate
          </h2>
          <p className="text-gray-400 text-lg">
            All the tools you need in one place
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
          {tools.map((tool, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 border ${tool.iconBg} transition-transform group-hover:-translate-y-2 shadow-lg`}>
                 {/* Representing the 3D-like icons with flat icons for now */}
                 {tool.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{tool.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
