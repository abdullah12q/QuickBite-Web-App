import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../util/http";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { getAuthToken, getIsAdmin } from "../../util/auth";
import FeedbackForm from "../forms/FeedbackForm";
import Feedbacks from "../ui/Feedbacks";

export default function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [extras, setExtras] = useState({
    extraCheese: false,
    spicySauce: false,
    makeItCombo: false,
  });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(
          `http://localhost:5050/feedback/getFeedback?id=${id}`
        );
        const data = await response.json();
        if (data.success) {
          setFeedbacks(data.feedbacks);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch feedback");
      }
    };
    fetchFeedback();
  }, [id]);

  const {
    data: product,
    isPending: isPendingProduct,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  function toggleExtra(option) {
    setExtras((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  }

  function handleAddToCart(product) {
    if (!getAuthToken()) {
      toast.error("Please login to add to cart!");
      return;
    }
    const productWithExtras = {
      ...product,
      extras,
    };

    addToCart(productWithExtras);
    toast.success(`${product.name} added to cart!`);
  }

  const averageRating =
    feedbacks.length > 0
      ? feedbacks.reduce((acc, item) => acc + item.Rate, 0) / feedbacks.length
      : 0;

  let content;

  if (isPendingProduct) {
    content = (
      <div className="text-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (isProductError) {
    content = (
      <div className="py-6 text-center bg-gray-900 rounded-md">
        <p className="text-red-500 text-lg font-medium">
          {productError.message || "Failed to load product."}
        </p>
      </div>
    );
  }

  if (!isPendingProduct && !isProductError) {
    content = (
      <div className="p-8 bg-gray-900 text-white min-h-screen mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden ">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover aspect-square"
            />
          </div>
          <div>
            <div className="mb-2">
              <span className="text-sm text-gray-400">
                {product.category.toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {product.name}
            </h1>
            {feedbacks.length > 0 && (
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.round(averageRating)
                          ? "text-orange-500 fill-orange-500"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-400">
                  ({feedbacks.length} reviews)
                </span>
              </div>
            )}
            <div className="text-2xl font-bold mb-4 text-orange-500">
              ${product.price.toFixed(2)}
            </div>
            <p className="text-gray-400 mb-6">{product.description}</p>
            {product.category === "Burgers" && (
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-orange-500 mb-3">
                  Extras
                </h3>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extras.extraCheese}
                      onChange={() => toggleExtra("extraCheese")}
                      className="accent-orange-500"
                    />
                    <span>Extra Cheese (+$20)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extras.spicySauce}
                      onChange={() => toggleExtra("spicySauce")}
                      className="accent-orange-500"
                    />
                    <span>Spicy Sauce (+$10)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extras.makeItCombo}
                      onChange={() => toggleExtra("makeItCombo")}
                      className="accent-orange-500"
                    />
                    <span>Make it a Combo (+$50)</span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                onClick={() => handleAddToCart(product)}
                disabled={getIsAdmin()}
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate("../")}
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-x-5">
          {/* display el feedbacks */}
          <Feedbacks feedbacks={feedbacks} />

          {/* Feedback Form */}
          <FeedbackForm
            error={error}
            setError={setError}
            setFeedbacks={setFeedbacks}
            id={id}
          />
        </div>
      </div>
    );
  }

  return content;
}
