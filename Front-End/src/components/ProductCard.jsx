import { useEffect, useState } from "react";
import { getIsAdmin } from "../util/auth";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const [isAdmin, setIsAdmin] = useState(getIsAdmin());
  const { addToCart } = useCart();

  useEffect(() => {
    setIsAdmin(getIsAdmin());
  }, []);

  function handleAddToCart(product) {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        {/* <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3> */}
        <Link
          to={`/products/${product.id}`}
          className="text-lg font-bold text-white mb-2 hover:text-orange-500"
        >
          {product.name}
        </Link>
        <h6 className="text-gray-400 mb-2 flex-grow">{product.description}</h6>
        <p className="text-orange-500 mb-4">${product.price.toFixed(2)}</p>
        {!isAdmin && (
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition duration-300 transform hover:scale-105 hover:shadow-md cursor-pointer"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
