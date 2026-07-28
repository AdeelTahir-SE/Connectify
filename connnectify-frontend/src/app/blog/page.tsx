"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "10 Tips for Better Remote Collaboration",
      excerpt: "Learn how to keep your team engaged and productive when working from anywhere in the world.",
      date: "Oct 12, 2024",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Introducing our new AI Assistant Feature",
      excerpt: "Meet your new co-pilot for video calls. Real-time translation, meeting notes, and action items.",
      date: "Oct 05, 2024",
      category: "Product News",
      image: "https://images.unsplash.com/photo-1531297172867-4f50fcc8fd7a?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "How to Secure Your Video Conferences",
      excerpt: "Privacy is our priority. Here are the best practices for ensuring your calls remain completely confidential.",
      date: "Sep 28, 2024",
      category: "Security",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "The Future of Hybrid Work in 2025",
      excerpt: "Exploring the trends that will shape how companies organize their workforce in the coming year.",
      date: "Sep 20, 2024",
      category: "Industry Trends",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Designing for Accessibility in Video Apps",
      excerpt: "Our journey to making Connectify usable for everyone, regardless of their physical abilities.",
      date: "Sep 15, 2024",
      category: "Design",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "Community Spotlight: Connectify for Education",
      excerpt: "How a university in Europe is using our platform to connect students across 20 different countries.",
      date: "Sep 02, 2024",
      category: "Community",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            The Connectify <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 leading-relaxed">
            Latest news, tips, and insights on communication and remote collaboration.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 px-6 relative z-10 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/blog`} key={post.id} className="clay-card overflow-hidden flex flex-col group cursor-pointer">
               <div className="w-full h-56 relative overflow-hidden bg-gray-200">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    {post.category}
                  </div>
               </div>
               <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{post.date}</span>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                     {post.excerpt}
                  </p>
                  <div className="flex items-center text-blue-600 font-bold text-sm">
                     Read Article <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
               </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
