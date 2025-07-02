import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
export default function HeroSectionToast({text}:{text:string}) {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          className="fixed top-6 right-6 z-50 flex items-center gap-4 rounded-lg max-w-[300px] border border-purple-300 bg-gray-400 px-6 py-4 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <p className="text-md text-purple-900 font-semibold ">
            ✨ {text}
          </p>
          <button
            onClick={() => setShowToast(false)}
            className=" text-purple-900  top-2 right-2 absolute hover:text-purple-700 focus:outline-none"
            aria-label="Close notification"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
