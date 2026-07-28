import Link from "next/link";
import { Twitter, Facebook, Instagram, Linkedin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0f1c] pt-20 pb-10 text-gray-400 font-sans mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-6">
        
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
               C
            </div>
            <span className="font-bold text-xl tracking-wide uppercase text-white">Connectify</span>
          </Link>
          <p className="text-sm mb-6 max-w-xs">Connect. Collaborate. Grow Together.</p>
          <p className="text-xs text-gray-500 mb-6">© 2024 Connectify. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <Link href="https://twitter.com" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
               <Twitter className="w-4 h-4" />
            </Link>
            <Link href="https://facebook.com" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
               <Facebook className="w-4 h-4" />
            </Link>
            <Link href="https://instagram.com" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
               <Instagram className="w-4 h-4" />
            </Link>
            <Link href="https://linkedin.com" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
               <Linkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Links Columns */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold mb-2">Product</h4>
          <Link href="/#features" className="text-sm hover:text-blue-400 transition-colors">Features</Link>
          <Link href="/#pricing" className="text-sm hover:text-blue-400 transition-colors">Pricing</Link>
          <Link href="/" className="text-sm hover:text-blue-400 transition-colors">Download</Link>
          <Link href="/blog" className="text-sm hover:text-blue-400 transition-colors">What&apos;s New</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold mb-2">Resources</h4>
          <Link href="/blog" className="text-sm hover:text-blue-400 transition-colors">Blog</Link>
          <Link href="/contact" className="text-sm hover:text-blue-400 transition-colors">Help Center</Link>
          <Link href="/blog" className="text-sm hover:text-blue-400 transition-colors">Guides</Link>
          <Link href="/" className="text-sm hover:text-blue-400 transition-colors">Developers</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <Link href="/about" className="text-sm hover:text-blue-400 transition-colors">About Us</Link>
          <Link href="/about" className="text-sm hover:text-blue-400 transition-colors">Careers</Link>
          <Link href="/contact" className="text-sm hover:text-blue-400 transition-colors">Contact</Link>
          <Link href="/about" className="text-sm hover:text-blue-400 transition-colors">Press Kit</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold mb-2">Legal</h4>
          <Link href="/" className="text-sm hover:text-blue-400 transition-colors">Privacy Policy</Link>
          <Link href="/" className="text-sm hover:text-blue-400 transition-colors">Terms of Service</Link>
          <Link href="/" className="text-sm hover:text-blue-400 transition-colors">Cookie Policy</Link>
          <Link href="/" className="text-sm hover:text-blue-400 transition-colors">Security</Link>
        </div>

        {/* Newsletter Column */}
        <div className="lg:col-span-6 border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex flex-col">
              <h4 className="text-white font-semibold">Subscribe to our newsletter</h4>
              <p className="text-xs mt-1">Get the latest updates and news</p>
           </div>
           <div className="flex w-full md:w-auto">
             <input type="email" placeholder="Enter your email" className="bg-gray-800 border-none rounded-l-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-64" />
             <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg px-4 py-2 flex items-center justify-center transition-colors">
                <Send className="w-4 h-4" />
             </button>
           </div>
        </div>

      </div>
    </footer>
  );
}
