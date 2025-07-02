import { FaRocket, FaStar, FaUser } from "react-icons/fa";
import ProductGrid from "../components/ProductGrid";

import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          delay: 0.5,
        }}
        className="relative bg-gray-900 py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gray-800 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-90"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-500">
              Fast Food, Delivered Fast
            </h1>
            <p className="text-lg mb-6 text-gray-300">
              Order your favorite meals from QuickBite and get them delivered
              right to your doorstep
            </p>
            <button
              onClick={() => {
                document
                  .getElementById("menu")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-orange-500 text-white text-lg px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
            >
              Order Now
            </button>
          </div>
        </div>
      </motion.section>

      {/* Menu Section */}
      <section id="menu" className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            Our Menu
          </h2>
          <ProductGrid />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <motion.section
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="py-12 bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
            Why Choose QuickBite?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-800 shadow-md">
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mb-4">
                <FaRocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Fast Delivery
              </h3>
              <p className="text-gray-400">
                We deliver your food while it's still hot. No delays,
                guaranteed.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-800 shadow-md">
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mb-4">
                <FaStar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Quality Food
              </h3>
              <p className="text-gray-400">
                We use only the freshest ingredients for all of our dishes.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-800 shadow-md">
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mb-4">
                <FaUser className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Customer First
              </h3>
              <p className="text-gray-400">
                Your satisfaction is our priority. We're always here to help.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="py-16 bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Order?
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-6">
            Join thousands of satisfied customers and order your favorite food
            now.
          </p>
          <button
            onClick={() => {
              document
                .getElementById("menu")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-orange-500 text-white text-lg px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
          >
            Browse Menu
          </button>
        </div>
      </motion.section>
    </>
  );
}
