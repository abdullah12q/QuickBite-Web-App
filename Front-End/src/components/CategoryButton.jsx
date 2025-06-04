export default function CategoryButton({
  activeCategory,
  category,
  handleClick,
  text,
}) {
  const isActive = activeCategory === category;

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer ${
        isActive
          ? "bg-orange-500 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
      onClick={() => handleClick(category)}
    >
      {text}
    </button>
  );
}
