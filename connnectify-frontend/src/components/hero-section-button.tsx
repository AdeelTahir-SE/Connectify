import * as motion from "motion/react-client";
export default function HeroSectionButton({text}:{text:string}) {
return(
    <motion.button
        className="bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold py-2 px-4 md:py-3 md:px-5 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-300 ease-in-out"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => alert("Button clicked!")}
        aria-label="Hero Section Button"
    >
        {text}

    </motion.button>
)
}