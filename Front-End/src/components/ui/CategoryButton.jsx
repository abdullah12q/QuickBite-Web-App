import { motion } from "framer-motion";

export default function CategoryButton({
  activeCategory,
  category,
  handleClick,
  text,
}) {
  const isActive = activeCategory === category;

  return (
    <motion.button
      variants={{
        hidden: { opacity: 0, scale: 0, y: 100 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: "spring" },
        },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      key={category}
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-400 cursor-pointer ${
        isActive
          ? "bg-orange-500 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
      onClick={() => handleClick(category)}
    >
      {text}
    </motion.button>
  );
}
