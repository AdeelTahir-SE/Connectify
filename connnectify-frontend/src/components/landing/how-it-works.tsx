"use client";

import { User, Phone, Users, Video, FolderOpen, Heart } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Sign Up",
      desc: "Create your free account in seconds",
      icon: <User className="w-6 h-6 text-indigo-500" />,
      color: "bg-indigo-100"
    },
    {
      title: "Choose Call",
      desc: "Start 1:1 call, group call or random match",
      icon: <Phone className="w-6 h-6 text-teal-500" />,
      color: "bg-teal-100"
    },
    {
      title: "Meet People",
      desc: "Find and connect with amazing people",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-100"
    },
    {
      title: "Video Chat",
      desc: "Enjoy smooth HD video calls",
      icon: <Video className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-200"
    },
    {
      title: "Share & Collaborate",
      desc: "Share files, screen and ideas",
      icon: <FolderOpen className="w-6 h-6 text-emerald-500" />,
      color: "bg-emerald-100"
    },
    {
      title: "Become Friends",
      desc: "Build meaningful connections",
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      color: "bg-pink-100"
    }
  ];

  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How <span className="text-blue-600">Connectify</span> Works
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5 bg-transparent border-t-2 border-dashed border-blue-200 -z-10"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-row md:flex-col items-center text-center gap-4 md:gap-6 mb-8 md:mb-0 w-full md:w-40 z-10">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center clay-card ${step.color}`}>
                {step.icon}
              </div>
              <div className="flex flex-col text-left md:text-center">
                <h4 className="font-bold text-gray-900 text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-gray-500 font-medium leading-tight px-0 md:px-2">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
