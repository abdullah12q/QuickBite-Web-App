import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="text-center p-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-6xl md:text-8xl font-bold text-orange-500 mb-4">
          404
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-6">
          Oops! The page you're looking for cannot be found.
        </p>
        <Link
          to="/"
          className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors duration-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
