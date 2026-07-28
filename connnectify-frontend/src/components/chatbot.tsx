"use client"
import { useState, useEffect } from "react";
import * as motion from "motion/react-client";
import {getChatBot,promptChatBot,setUserChatWithBot} from "@/actions/chatBot";
import {message} from "@/utils/types"
import { useUser } from "@/utils/context";
export default function ChatBot() {
  const [clicked, setClicked] = useState(false);
  const [chat, setChat] = useState<message[]>([]);
 const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const {user}=useUser()
  async function fetchChat() {
    try {
      const response = await getChatBot(user?.uid as string)
      if (response && response?.data) {
        setChat(response?.data);
      } else {
        console.error("No chat data found");
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  }
  useEffect(() => {
    if (clicked) {
      fetchChat();
    }
    return () => {
      setChat([]);
    };
  }, [clicked]);


  async function handleSend(){
    if (!input.trim()) return; 
    const newMessage: message = { role: "user", content: input };
    setChat((prev) => [...prev, newMessage]);
    setInput("");
    setGenerating(true);
    try {
      const response = await promptChatBot(input);
      if (response && response.data) {
        const botMessage: message = { role: "bot", content: response.data };
        setChat((prev) => [...prev, botMessage]);
        setUserChatWithBot(user?.uid as string,[...chat,newMessage,botMessage])
        console.log(chat,"outide")
      } else {
        console.error("No response data found");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setGenerating(false);
    }

  }
  return (
    <motion.section drag>
      {clicked ? (
      <section className="fixed z-50 bottom-24 right-4 w-80 h-[500px] clay-card bg-white rounded-2xl flex flex-col overflow-hidden border border-gray-100">
          <div className="flex items-center justify-between bg-blue-600 text-white px-5 py-3 shadow-sm">
            <h2 className="text-md font-bold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              Connectify AI
            </h2>
            <button
              onClick={() => setClicked(false)}
              className="text-white hover:text-blue-200 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50">
            {chat.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                </div>
                <p className="text-sm font-medium">How can I help you today?</p>
              </div>
            ) : (
              chat.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white self-end ml-auto rounded-tr-none shadow-sm"
                      : "bg-white text-gray-700 self-start mr-auto rounded-tl-none border border-gray-100 shadow-sm"
                  }`}
                >
                  {m.content}
                </div>
              ))
            )}
            {generating && (
              <div className="p-3 bg-white text-gray-500 self-start mr-auto rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-sm flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-gray-100">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 border-transparent rounded-full px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || generating}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </form>
          </div>
        </section>
      ) : (
        <motion.div
          drag
          dragConstraints={{ top: -500, left:-500, right: 5, bottom: 5 }}
          className="fixed z-50 bottom-6 right-6 w-16 h-16 bg-blue-600 rounded-full shadow-[0_10px_25px_rgba(37,99,235,0.4)] flex items-center justify-center cursor-pointer text-white clay-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setClicked(true);
          }}
          aria-label="Chat Bot Button"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        </motion.div>
      )}
    </motion.section>
  );
}
