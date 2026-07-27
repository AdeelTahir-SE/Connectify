"use client";

import { Video, Users, Heart, Smile, FileText, MonitorUp } from "lucide-react";

const features = [
  {
    icon: <Video className="w-6 h-6 text-purple-400" />,
    title: "Live 1:1 Calls",
    description: "Private, secure and high-quality calls",
    iconBg: "bg-purple-900/40",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-400" />,
    title: "Group Calls",
    description: "Up to 10 participants in a single call",
    iconBg: "bg-blue-900/40",
  },
  {
    icon: <Heart className="w-6 h-6 text-pink-400" />,
    title: "Random Match",
    description: "Meet new people worldwide instantly",
    iconBg: "bg-pink-900/40",
  },
  {
    icon: <Smile className="w-6 h-6 text-orange-400" />,
    title: "Live Reactions",
    description: "Express with emojis and live reactions",
    iconBg: "bg-orange-900/40",
  },
  {
    icon: <FileText className="w-6 h-6 text-emerald-400" />,
    title: "File Sharing",
    description: "Share files and work together in real time",
    iconBg: "bg-emerald-900/40",
  },
  {
    icon: <MonitorUp className="w-6 h-6 text-cyan-400" />,
    title: "Screen Sharing",
    description: "Present, collaborate and get things done",
    iconBg: "bg-cyan-900/40",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-24 bg-[#050509] flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything <span className="text-purple-400">you need</span> to connect
          </h2>
          <p className="text-gray-400 text-lg">
            Powerful features for meaningful conversations and collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <div className={`p-4 rounded-xl ${feature.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
