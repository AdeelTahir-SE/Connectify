"use client";

import { Video, Users, Globe, Smile, FolderOpen, MonitorUp } from "lucide-react";

export default function WhySection() {
  const features = [
    {
      title: "Live 1:1 Calls",
      description: "Private, secure and high-quality calls.",
      icon: <Video className="w-8 h-8 text-purple-600" />,
      bgColor: "bg-purple-100",
      shadow: "shadow-purple-500/10"
    },
    {
      title: "Group Calls",
      description: "Up to 10 participants in a single call.",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-100",
      shadow: "shadow-blue-500/10"
    },
    {
      title: "Random Match",
      description: "Meet new people worldwide instantly.",
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      bgColor: "bg-teal-100",
      shadow: "shadow-teal-500/10"
    },
    {
      title: "Live Reactions",
      description: "Express with emojis and live reactions.",
      icon: <Smile className="w-8 h-8 text-yellow-600" />,
      bgColor: "bg-yellow-100",
      shadow: "shadow-yellow-500/10"
    },
    {
      title: "File Sharing",
      description: "Share files and work together in real time.",
      icon: <FolderOpen className="w-8 h-8 text-indigo-600" />,
      bgColor: "bg-indigo-100",
      shadow: "shadow-indigo-500/10"
    },
    {
      title: "Screen Sharing",
      description: "Present, collaborate and get things done.",
      icon: <MonitorUp className="w-8 h-8 text-sky-600" />,
      bgColor: "bg-sky-100",
      shadow: "shadow-sky-500/10"
    }
  ];

  return (
    <section id="features" className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why <span className="text-blue-600">Connectify?</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="col-span-1 lg:col-span-2 flex flex-col items-center p-8 clay-card text-center">
              <div className={`w-20 h-16 rounded-2xl ${feature.bgColor} ${feature.shadow} shadow-lg flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 font-medium px-4">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
