"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Users, Globe, Zap, Heart } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Active Users", value: "10M+", icon: <Users className="w-6 h-6 text-blue-600" /> },
    { label: "Countries", value: "120+", icon: <Globe className="w-6 h-6 text-purple-600" /> },
    { label: "Daily Calls", value: "50M+", icon: <Zap className="w-6 h-6 text-yellow-500" /> },
    { label: "User Rating", value: "4.8", icon: <Heart className="w-6 h-6 text-pink-500" /> },
  ];

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 text-center">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Connecting the <span className="text-blue-600">World</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 leading-relaxed">
            At Connectify, we believe that geography should never be a barrier to human connection. Our mission is to build the world&apos;s most seamless, secure, and enjoyable communication platform.
          </p>
        </div>
      </section>

      {/* Mission & Vision (Clay Cards) */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="clay-card p-10 flex flex-col items-start">
             <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-blue-600" />
             </div>
             <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
             <p className="text-gray-600 leading-relaxed text-sm">
               To empower people across the globe to collaborate effortlessly. Whether you are catching up with family, hosting a team meeting, or meeting someone completely new, Connectify is designed to bring you closer.
             </p>
          </div>
          <div className="clay-card p-10 flex flex-col items-start">
             <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-purple-600" />
             </div>
             <h3 className="text-2xl font-bold mb-4">Our Core Values</h3>
             <p className="text-gray-600 leading-relaxed text-sm">
               We prioritize user privacy, unparalleled video quality, and an intuitive user experience. We build with empathy, design for inclusivity, and engineer for scale.
             </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Connectify by the Numbers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="clay-card p-8 flex flex-col items-center text-center">
                <div className="mb-4">{stat.icon}</div>
                <h4 className="text-4xl font-extrabold text-gray-900 mb-2">{stat.value}</h4>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
