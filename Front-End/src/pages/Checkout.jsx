import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { getAuthToken, getUserId } from "../util/auth";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const navigate = useNavigate();

  const userId = getUserId();
  const token = getAuthToken();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cash_on_delivery",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [subtotal, setSubtotal] = useState(0);
  const deliveryFee = 50;

  useEffect(() => {
    const newSubtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  }, [cart]);

  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!cart.length) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5050/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          paymentMethod: formData.paymentMethod,
          address: formData.address,
          items: cart,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error(result.message);
        throw new Error(result.message || "Update failed");
      }

      setIsSubmitting(false);
      toast.success("Order placed successfully! Your food is on the way.");
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8 mt-14">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* === Delivery Info Form === */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-orange-500">
                Delivery Information
              </h2>
              <p className="text-gray-400 mb-6">
                Enter your delivery details below
              </p>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                {/* Name & Phone Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-400">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-orange-500"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-400">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-orange-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                {/* Address Input */}
                <div>
                  <label htmlFor="address" className="block text-gray-400">
                    Street Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-orange-500"
                    placeholder="123 Main St"
                  />
                </div>

                {/* Payment Method Select */}
                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="block text-gray-400"
                  >
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-orange-500 cursor-pointer"
                  >
                    <option value="cash_on_delivery">Cash on Delivery</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition duration-300 disabled:opacity-50 cursor-pointer"
                  disabled={isSubmitting}
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* === Order Summary Section === */}
          <div className="lg:max-w-md">
            <div className="bg-gray-800 rounded-lg p-6 h-fit sticky top-4">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <p className="text-gray-400 mb-4">{cart.length} items in cart</p>

              {/* List of items in cart */}
              <div className="space-y-4 mb-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-700 pb-4 last:border-0"
                  >
                    <div className="flex justify-between">
                      <span className="text-gray-300 font-medium">
                        {item.quantity} × {item.name}
                      </span>
                      <span className="text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    {item.variation && (
                      <p className="text-gray-500 text-sm mt-1">
                        {item.variation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <hr className="border-gray-700 my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery Fee</span>
                  <span className="text-white">${deliveryFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-lg font-bold mt-4 pt-2 border-t border-gray-700">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-400 mt-6">
                All payments are processed securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
