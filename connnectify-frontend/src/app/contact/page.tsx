"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6 text-center">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 leading-relaxed">
            Have questions about our platform or need support? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 px-6 relative z-10 mb-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
           
           {/* Contact Info */}
           <div className="lg:w-1/3 flex flex-col gap-6">
              <div className="clay-card p-8 flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Email Us</h4>
                    <p className="text-sm text-gray-500 mb-2">Our friendly team is here to help.</p>
                    <a href="mailto:hi@connectify.app" className="text-blue-600 font-bold hover:underline">hi@connectify.app</a>
                 </div>
              </div>

              <div className="clay-card p-8 flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Office</h4>
                    <p className="text-sm text-gray-500 mb-2">Come say hello at our headquarters.</p>
                    <span className="text-gray-900 font-medium">100 Market St, San Francisco, CA 94105</span>
                 </div>
              </div>

              <div className="clay-card p-8 flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-teal-600" />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Phone</h4>
                    <p className="text-sm text-gray-500 mb-2">Mon-Fri from 8am to 5pm.</p>
                    <a href="tel:+15550000000" className="text-blue-600 font-bold hover:underline">+1 (555) 000-0000</a>
                 </div>
              </div>
           </div>

           {/* Contact Form */}
           <div className="lg:w-2/3 clay-card p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="flex flex-col gap-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">First Name</label>
                       <input type="text" placeholder="First name" className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Last Name</label>
                       <input type="text" placeholder="Last name" className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900" />
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
                    <input type="email" placeholder="you@company.com" className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900" />
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Message</label>
                    <textarea rows={5} placeholder="How can we help you?" className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900 resize-none"></textarea>
                 </div>

                 <button type="button" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold mt-2 clay-btn hover:bg-blue-700 flex items-center justify-center gap-2">
                    Send Message <Send className="w-4 h-4" />
                 </button>
              </form>
           </div>
           
        </div>
      </section>

      <Footer />
    </main>
  );
}
