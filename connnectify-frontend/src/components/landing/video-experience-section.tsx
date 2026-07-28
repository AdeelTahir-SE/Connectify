"use client";

import { Video, MessageSquare, Upload, Monitor, Bot, Shuffle, Mic, MicOff, PhoneOff, MoreHorizontal } from "lucide-react";

export default function VideoExperienceSection() {
  return (
    <section className="w-full py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          
          {/* Left Features */}
          <div className="flex flex-col gap-6 w-full lg:w-[250px]">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">HD Live Video</h4>
                <p className="text-[11px] text-gray-500 mt-1 leading-tight">Crystal clear video for better conversations</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Instant Chat</h4>
                <p className="text-[11px] text-gray-500 mt-1 leading-tight">Real-time messaging during calls</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                <Upload className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">File Sharing</h4>
                <p className="text-[11px] text-gray-500 mt-1 leading-tight">Share any file instantly and securely</p>
              </div>
            </div>
          </div>

          {/* Central Mockup */}
          <div className="flex-1 max-w-3xl w-full">
            <div className="relative rounded-2xl md:rounded-3xl bg-[#1c1c1e] shadow-2xl overflow-hidden border border-gray-800 p-2 md:p-4">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white"><Video className="w-4 h-4" /></div>
                  <span className="text-white font-semibold text-sm">Group Call</span>
                  <span className="text-gray-400 text-xs ml-2">00:24:19</span>
                </div>
                <div className="flex items-center gap-2 bg-[#2c2c2e] px-3 py-1.5 rounded-lg text-white text-xs">
                  Chat <div className="w-2 h-2 rounded-full bg-red-500 ml-1"></div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 h-[400px]">
                {/* Video Grid */}
                <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2 h-full">
                  <div className="relative rounded-xl overflow-hidden bg-gray-800">
                    <img src="https://i.pravatar.cc/300?img=5" className="w-full h-full object-cover" alt="User 1"/>
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-white text-[10px] flex items-center gap-1">
                      <Mic className="w-3 h-3" /> Sarah
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-gray-800">
                    <img src="https://i.pravatar.cc/300?img=11" className="w-full h-full object-cover" alt="User 2"/>
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-white text-[10px] flex items-center gap-1">
                      <Mic className="w-3 h-3" /> David
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-gray-800">
                    <img src="https://i.pravatar.cc/300?img=33" className="w-full h-full object-cover" alt="User 3"/>
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-white text-[10px] flex items-center gap-1">
                      <MicOff className="w-3 h-3 text-red-500" /> You
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-gray-800">
                    <img src="https://i.pravatar.cc/300?img=47" className="w-full h-full object-cover" alt="User 4"/>
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-white text-[10px] flex items-center gap-1">
                      <Mic className="w-3 h-3" /> Priya
                    </div>
                  </div>
                </div>

                {/* Chat Sidebar Overlay (Hidden on small screens) */}
                <div className="hidden md:flex w-64 bg-[#2c2c2e] rounded-xl flex-col h-full overflow-hidden">
                   <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
                      <div className="flex gap-2">
                         <img src="https://i.pravatar.cc/100?img=5" className="w-6 h-6 rounded-full" alt="" />
                         <div>
                            <span className="text-[10px] text-gray-400">Sarah 12:18 PM</span>
                            <div className="text-xs text-white bg-black/30 p-2 rounded-lg mt-1 rounded-tl-none">Hey everyone! 👋</div>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <img src="https://i.pravatar.cc/100?img=11" className="w-6 h-6 rounded-full" alt="" />
                         <div>
                            <span className="text-[10px] text-gray-400">David 12:20 PM</span>
                            <div className="text-xs text-white bg-black/30 p-2 rounded-lg mt-1 rounded-tl-none">Let&apos;s start the meeting.</div>
                         </div>
                      </div>
                   </div>
                   <div className="p-3 border-t border-gray-700">
                     <div className="bg-black/40 rounded-lg p-2 text-xs text-gray-500">Type a message...</div>
                   </div>
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-xl">
                <button className="w-10 h-10 rounded-full bg-[#2c2c2e] text-white flex items-center justify-center hover:bg-gray-700"><Mic className="w-5 h-5"/></button>
                <button className="w-10 h-10 rounded-full bg-[#2c2c2e] text-white flex items-center justify-center hover:bg-gray-700"><Video className="w-5 h-5"/></button>
                <button className="w-10 h-10 rounded-full bg-[#2c2c2e] text-white flex items-center justify-center hover:bg-gray-700"><Monitor className="w-5 h-5"/></button>
                <button className="w-10 h-10 rounded-full bg-[#2c2c2e] text-white flex items-center justify-center hover:bg-gray-700"><MoreHorizontal className="w-5 h-5"/></button>
                <button className="w-12 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 px-3"><PhoneOff className="w-5 h-5"/></button>
              </div>

            </div>
            
            {/* Bottom Feature Button */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center shrink-0">
                  <Shuffle className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Random Match</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-tight">Discover and meet new people</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Features */}
          <div className="flex flex-col gap-6 w-full lg:w-[250px]">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Screen Sharing</h4>
                <p className="text-[11px] text-gray-500 mt-1 leading-tight">Share your screen and collaborate visually</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">AI Assistant</h4>
                <p className="text-[11px] text-gray-500 mt-1 leading-tight">Get help anytime with our smart assistant</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
