"use client"
import { useState, useEffect } from "react";
import * as motion from "motion/react-client";
import {getChatBot,promptChatBot,setUserChatWithBot} from "@/actions/chatBot";
import {message} from "@/utils/types"

export default function ChatBot() {
  const [clicked, setClicked] = useState(false);
  const [chat, setChat] = useState<message[]>([]);
 const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);
  async function fetchChat() {
    try {
      const response = await getChatBot("asd")
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
        setUserChatWithBot("asd",[...chat,newMessage,botMessage])
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
      <section className="fixed z-30 bottom-4 right-4 w-80 h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="flex items-center justify-between bg-[#673778] text-white px-4 py-2">
            <h2 className="text-lg font-semibold">Connectify Chat with chub</h2>
            <button
              onClick={() => setClicked(false)}
              className="text-white hover:text-gray-300 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {chat.length === 0 ? (
              <p className="text-gray-500 text-sm">Start the conversation!</p>
            ) : (
              chat.map((m, i) => (
                <div
                  key={i}
                  className={`p-2 rounded ${
                    m.role === "user"
                      ? "bg-blue-100 self-end text-right"
                      : "bg-gray-200 self-start text-left"
                  }`}
                >
                  {m.content}
                </div>
              ))
            )}
            {generating && (
              <div className="p-2 bg-gray-200 self-start text-left">
                Generating response...
              </div>
            )}
          </div>

          <div className="flex items-center border-t border-gray-300 p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-[#673778] text-white px-3 py-1 rounded hover:bg-purple-500 text-sm"
            >
              Send
            </button>
          </div>
        </section>
      ) : (
        <motion.img
          src="/erasebg-transformed.webp"
          drag
          className="fixed z-30 bottom-4 right-4 w-16 h-16 bg-white p-2 rounded-full shadow-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setClicked(true);
          }}
          aria-label="Chat Bot Button"
          /> 
      )}
    </motion.section>
  );
}
