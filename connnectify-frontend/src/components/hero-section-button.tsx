"use client";

import { useUser } from "@/utils/context";
import * as motion from "motion/react-client";
import { useState } from "react";

export default function HeroSectionButton({ text }: { text: string }) {
  const {user} = useUser();
  const [showWarning, setShowWarning] = useState(false);

  const handleClick = () => {
    if (!user?.name) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000); 
      return;
    }

    window.location.href = "/dashboard";
  };

  return (
    <div className="relative max-w-fit max-h-fit">
      <motion.button
        onClick={handleClick}
        className="bg-gradient-to-br from-purple-500 to-purple-700 cursor-pointer text-white font-bold py-2 px-4 md:py-3 md:px-5 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-300 ease-in-out"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Hero Section Button"
      >
        {text}
      </motion.button>

      {showWarning && (
        <div className="absolute top-full left-0 mt-2 bg-red-500 text-white text-sm px-4 py-2 rounded shadow-lg">
          Please sign up first to continue.
        </div>
      )}
    </div>
  );
}
