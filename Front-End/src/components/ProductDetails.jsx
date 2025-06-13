import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../util/http";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { getAuthToken, getIsAdmin } from "../util/auth";

export default function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(1);
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const currentDate = new Date().toISOString().split("T")[0];

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

  async function handleSubmitFeedback(e) {
    e.preventDefault(); //3shan tmn3 el browser eno yreload
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(
        `http://localhost:5050/feedback/leaveFeedback?id=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: username,
            Comment: comment,
            Rate: rate,
            Date: currentDate,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setSuccessMessage(data.message);
        const updatedFeedback = await fetch(
          `http://localhost:5050/feedback/getFeedback?id=${id}`
        );
        const updatedData = await updatedFeedback.json();
        if (updatedData.success) {
          setFeedbacks(updatedData.feedbacks);
        }

        setUsername("");
        setComment("");
        setRate(1);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message || "Failed to submit feedback");
    }
  }

  function handleAddToCart(product) {
    if (!getAuthToken()) {
      toast.error("Please login to add to cart!");
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  }

  const averageRating =
    feedbacks.length > 0
      ? feedbacks.reduce((acc, item) => acc + item.Rate, 0) / feedbacks.length
      : 0;

  const {
    data: product,
    isPending: isPendingProduct,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

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
      <div className="container mx-auto p-8 bg-gray-900 text-white min-h-screen mt-20">
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

          {/* Feedback Form */}
          <div className="mt-10">
            {getAuthToken() && (
              <>
                <h2 className="text-2xl font-semibold text-orange-500 mb-4">
                  Leave Your Feedback
                </h2>
                <form onSubmit={handleSubmitFeedback}>
                  <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {successMessage && (
                      <p className="text-green-500 mb-4">{successMessage}</p>
                    )}
                    <div>
                      <div className="mb-4">
                        <label
                          htmlFor="username"
                          className="block text-gray-300 text-sm font-bold mb-2"
                        >
                          Username:
                        </label>
                        <input
                          type="text"
                          id="username"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="comment"
                          className="block text-gray-300 text-sm font-bold mb-2"
                        >
                          Comment:
                        </label>
                        <textarea
                          id="comment"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows="3"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="rate"
                          className="block text-gray-300 text-sm font-bold mb-2"
                        >
                          Rating (1-5):
                        </label>
                        <select
                          id="rate"
                          className="shadow border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 cursor-pointer focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                          value={rate}
                          onChange={(e) => setRate(Number(e.target.value))} //e.target.value btrg3 string fa lazem a7wlha number
                          required
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-colors duration-200"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}

            {/* display el feedbacks */}
            <div>
              <h3 className="text-xl font-semibold text-orange-500 mb-4">
                Customers Feedbacks
              </h3>
              {feedbacks.length === 0 ? (
                <p className="text-gray-400">No feedbacks yet.</p>
              ) : (
                <ul className="space-y-4">
                  {feedbacks.map((feedback, index) => (
                    <li
                      key={index}
                      className="bg-gray-800 p-4 rounded-lg shadow-md"
                    >
                      <div className="text-gray-300">
                        <div className="flex items-center mb-2">
                          <span className="font-bold">{feedback.UserName}</span>
                          <div className="flex mx-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= feedback.Rate
                                    ? "text-orange-500 fill-orange-500"
                                    : "text-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">
                            {feedback.Rate}/5
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400">{feedback.Comment}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(feedback.Date).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
}
