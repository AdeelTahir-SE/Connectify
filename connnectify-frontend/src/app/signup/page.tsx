"use client";

import { Eye, EyeOff, Lock, Mail, User, ShieldCheck, Zap, Globe, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#050509] flex flex-col md:flex-row font-sans text-white">
      {/* Left Column - Branding & Visuals */}
      <div className="flex-1 p-8 lg:p-16 flex flex-col relative overflow-hidden hidden md:flex border-r border-white/5">
        {/* Abstract Background Effects */}
        <div className="absolute top-[20%] right-[10%] w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] opacity-60"></div>
        <div className="absolute top-[40%] right-[30%] w-1.5 h-1.5 bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899] opacity-80"></div>
        <div className="absolute bottom-[30%] left-[10%] w-2.5 h-2.5 bg-purple-400 rounded-full shadow-[0_0_12px_#c084fc] opacity-50"></div>
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-20 z-10 w-fit hover:opacity-80 transition-opacity">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-purple-900/40">
             <Image src="/star-shine.svg" alt="Star" width={16} height={16} />
          </div>
          <span className="font-bold text-xl tracking-wide">Connectify</span>
        </Link>

        {/* Content */}
        <div className="z-10 max-w-lg mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Create your account<br />
            and start <span className="text-purple-500 text-glow-primary">connecting</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Join millions of people and explore the world through meaningful conversations.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Instant Connect</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-400" />
              <span>Millions of Users</span>
            </div>
          </div>
        </div>

        {/* Globe Visualization */}
        <div className="relative flex-1 min-h-[300px] w-full mt-10">
           {/* Huge glowing globe */}
           <div className="absolute bottom-[-40%] left-1/2 -translate-x-1/2 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] rounded-full bg-gradient-to-tr from-indigo-900 via-purple-700 to-fuchsia-900 shadow-[0_0_80px_rgba(147,51,234,0.4)] overflow-hidden border border-purple-500/30">
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
           </div>
           
           {/* Orbit lines */}
           <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-[100%] border border-white/10 rotate-[-15deg]"></div>
           <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[550px] h-[150px] rounded-[100%] border border-white/5 rotate-[10deg]"></div>

           {/* Floating elements */}
           <div className="absolute top-[20%] left-[20%] w-16 h-16 rounded-full border-2 border-purple-500/50 flex items-center justify-center backdrop-blur-md bg-purple-900/40 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <img src="https://i.pravatar.cc/150?img=47" alt="user" className="w-14 h-14 rounded-full object-cover" />
           </div>
           
           <div className="absolute top-[15%] right-[25%] w-12 h-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center">
              <div className="flex gap-1">
                 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
           </div>

           <div className="absolute top-[40%] right-[15%] w-20 h-20 rounded-full border-2 border-purple-500/50 flex items-center justify-center backdrop-blur-md bg-purple-900/40 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <img src="https://i.pravatar.cc/150?img=11" alt="user" className="w-16 h-16 rounded-full object-cover" />
           </div>

           <div className="absolute bottom-[20%] left-[10%] w-16 h-16 rounded-full border-2 border-purple-500/50 flex items-center justify-center backdrop-blur-md bg-purple-900/40 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <img src="https://i.pravatar.cc/150?img=12" alt="user" className="w-14 h-14 rounded-full object-cover" />
           </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 flex flex-col p-6 lg:p-12 h-screen overflow-y-auto">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="md:hidden flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-purple-900/40">
               <Image src="/star-shine.svg" alt="Star" width={16} height={16} />
            </div>
            <span className="font-bold">Connectify</span>
          </Link>
          <div className="text-sm">
            <span className="text-gray-400">Have an account? </span>
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">Log in</Link>
          </div>
        </div>

        {/* Desktop Login Link */}
        <div className="hidden md:flex justify-end mb-12">
          <div className="text-sm">
            <span className="text-gray-400">Already have an account? </span>
            <Link href="/login" className="px-4 py-2 rounded-md border border-white/10 hover:bg-white/5 transition-colors ml-2 font-medium">Log in</Link>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto flex flex-col flex-1">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Sign <span className="text-purple-400">Up</span></h2>
            <p className="text-gray-400 text-sm">Let&apos;s get you started with Connectify</p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-sm font-medium">
              <Github className="w-4 h-4" />
              GitHub
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
              </svg>
              Discord
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-gray-500 text-xs font-medium">or</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a strong password" 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm your password" 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white"
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="button" className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(147,51,234,0.4)] mt-2 transition-all">
              Create Account &rarr;
            </button>
            
            <div className="flex items-center gap-2 mt-2 justify-center">
              <input type="checkbox" id="terms" className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900" defaultChecked />
              <label htmlFor="terms" className="text-xs text-gray-400">
                I agree to the <Link href="#" className="text-purple-400 hover:underline">Terms of Service</Link> and <Link href="#" className="text-purple-400 hover:underline">Privacy Policy</Link>
              </label>
            </div>
          </form>

          {/* Bottom Features */}
          <div className="mt-12 bg-white/[0.02] border border-white/5 rounded-xl p-4 flex justify-between gap-4">
             <div className="flex flex-col items-center text-center gap-1 flex-1">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-semibold text-white">End-to-end Encryption</span>
                <span className="text-[10px] text-gray-500 leading-tight">Your privacy is our priority</span>
             </div>
             <div className="flex flex-col items-center text-center gap-1 flex-1 border-l border-white/5 pl-4">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-semibold text-white">Instant Connections</span>
                <span className="text-[10px] text-gray-500 leading-tight">Connect with people in real-time</span>
             </div>
             <div className="flex flex-col items-center text-center gap-1 flex-1 border-l border-white/5 pl-4">
                <Globe className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-semibold text-white">Global Community</span>
                <span className="text-[10px] text-gray-500 leading-tight">Meet people from around the world</span>
             </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6 pb-6">
            By signing up, you&apos;re joining a global community<br />
            of people who value <span className="text-purple-400 font-medium">real connections.</span>
          </p>
        </div>
      </div>
    </main>
  );
}
