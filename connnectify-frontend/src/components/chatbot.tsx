import { useState, useEffect } from "react";
import * as motion from "motion/react-client";
import {getChatBot} from "@/actions/chatBot";
export default function ChatBot() {
  const [clicked, setClicked] = useState(false);
  const [chat, setChat] = useState<[]>([]);

  async function fetchChat() {
    try {
      const response = ["as"];
      if (response && response) {
        setChat(response);
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
  return (
    <motion.section>
      {clicked ? (
       <motion.section className="fixed bottom-0 right-0 w-full h-full bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center p-4">

            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
            >
                <h2 className="text-xl font-bold mb-4 text-center">Chat Bot</h2>
                <div className="overflow-y-auto h-64">
                {chat.map((message, index) => (
                    <div key={index} className="mb-2">
                    <p className="text-gray-800">{message}</p>
                    </div>
                ))}
                </div>
                <button
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                onClick={() => setClicked(false)}
                >
                Close Chat
                </button>
            </motion.div>
       </motion.section>

      ) : (
        <motion.img
          src="/erasebg-transformed.webp"
          className="fixed bottom-4 right-4 w-16 h-16 rounded-full shadow-lg cursor-pointer"
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
