"use client";

import { Eye, EyeOff, Lock, Mail, ShieldCheck, Globe, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/utils/context";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      const { auth } = await import("@/utils/firebase");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName || "User",
        photoURL: userCredential.user.photoURL,
      };
      
      document.cookie = `user=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=86400`;
      setUser(userData);
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { signInWithPopup } = await import("firebase/auth");
      const { auth, googleProvider } = await import("@/utils/firebase");
      const result = await signInWithPopup(auth, googleProvider);
      
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName || "User",
        photoURL: result.user.photoURL,
      };
      
      document.cookie = `user=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=86400`;
      setUser(userData);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900 overflow-hidden relative">
      
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-purple-400/20 blur-3xl pointer-events-none"></div>

      {/* Left Column - Branding & Visuals */}
      <div className="flex-1 p-8 lg:p-16 flex flex-col relative z-10 hidden md:flex justify-center border-r border-gray-200">
        
        {/* Logo */}
        <Link href="/" className="absolute top-10 left-10 flex items-center gap-2 mb-20 z-10 w-fit hover:opacity-80 transition-opacity">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
             C
          </div>
          <span className="font-bold text-xl tracking-wide uppercase text-gray-900">Connectify</span>
        </Link>

        {/* Content */}
        <div className="z-10 max-w-lg">

          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-gray-900">
            Log in to your<br />
            account and <span className="text-blue-600">connect</span>
          </h1>
          <p className="text-gray-500 text-lg mb-10">
            Access your dashboard, connect with friends, and continue building meaningful relationships.
          </p>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-4 clay-card p-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Secure & Private</h4>
                <p className="text-xs text-gray-500">Your privacy is our priority with end-to-end encryption.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 clay-card p-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Global Community</h4>
                <p className="text-xs text-gray-500">Meet and collaborate with people from around the world.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 flex flex-col items-center p-6 lg:p-12 relative z-10 h-screen overflow-y-auto">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="md:hidden flex justify-between items-center w-full max-w-md mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
               C
            </div>
            <span className="font-bold text-gray-900">Connectify</span>
          </Link>
          <div className="text-sm">
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-bold">Sign up</Link>
          </div>
        </div>

        <div className="w-full max-w-md clay-card p-8 md:p-10 my-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Log In</h2>
            <p className="text-gray-500 text-sm">Welcome back to Connectify</p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button onClick={handleGoogleLogin} type="button" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-colors text-sm font-bold text-gray-700 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-colors text-sm font-bold text-gray-700 shadow-sm">
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">or log in with email</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                 <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
                 <Link href="/" className="text-xs text-blue-600 font-bold hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-11 pr-11 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900 placeholder:text-gray-400"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold mt-2 clay-btn hover:bg-blue-700">
              {loading ? "Logging In..." : "Log In"}
            </button>
            <div className="flex w-full justify-center items-center text-sm font-medium mt-6 pt-6 border-t border-gray-100">
              <span className="text-gray-500">Don&apos;t have an account? </span>
              <Link href="/signup" className="ml-2 px-6 py-2.5 rounded-full clay-btn-white text-blue-600 font-bold hover:text-blue-700">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
