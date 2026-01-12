import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const EXTRA_PRICES = {
  extraCheese: 20,
  spicySauce: 10,
  makeItCombo: 50,
};

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const [totalPrice, setTotalPrice] = useState(0);

  const getExtrasPrice = (extras = {}) => {
    return Object.keys(extras).reduce((total, key) => {
      return extras[key] ? total + EXTRA_PRICES[key] : total;
    }, 0);
  };

  useEffect(() => {
    const newTotalPrice = cart.reduce((total, item) => {
      const extrasPrice = getExtrasPrice(item.extras);
      return total + (item.price + extrasPrice) * item.quantity;
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [cart]);

  const deliveryFee = 50;
  let total;
  if (cart.length > 0) {
    total = totalPrice + deliveryFee;
  } else {
    total = 0;
  }
  const isEmpty = cart.length === 0;

  const handleClearCart = () => {
    clearCart();
    setTotalPrice(0);
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto p-8 mt-14">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {isEmpty ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/"
              className="bg-orange-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 transition duration-300"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left section: Cart items list */}
            <div className="md:w-3/4">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center justify-between bg-gray-800 rounded-lg p-4 mb-4"
                >
                  {/* Item details */}
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {item.description}
                      </p>
                      {item.extras && (
                        <ul className="text-sm text-gray-400 mt-2">
                          {item.extras.extraCheese && (
                            <li>• Extra Cheese (+$20)</li>
                          )}
                          {item.extras.spicySauce && (
                            <li>• Spicy Sauce (+$10)</li>
                          )}
                          {item.extras.makeItCombo && <li>• Combo (+$50)</li>}
                        </ul>
                      )}

                      <p className="text-orange-500">
                        ${item.price.toFixed(2)} + $
                        {getExtrasPrice(item.extras).toFixed(2)} = $
                        {(item.price + getExtrasPrice(item.extras)).toFixed(2)}{" "}
                        per item
                      </p>
                    </div>
                  </div>

                  {/* Quantity controls and total per item */}
                  <div className="flex items-center">
                    <div className="flex items-center border border-gray-700 rounded-lg mr-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity - 1)
                        }
                        className="bg-gray-700 text-white px-3 py-2 rounded-l-lg hover:bg-gray-600 disabled:opacity-50 disabled:hover:bg-gray-700 cursor-pointer disabled:cursor-not-allowed"
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity + 1)
                        }
                        className="bg-gray-700 text-white px-3 py-2 rounded-r-lg hover:bg-gray-600 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Total price for this item */}
                    <span className="font-bold">
                      $
                      {(
                        (item.price + getExtrasPrice(item.extras)) *
                        item.quantity
                      ).toFixed(2)}
                    </span>

                    {/* Remove item button */}
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-red-500 hover:text-red-400 ml-4 cursor-pointer"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right section: Order Summary */}
            {cart.length > 0 && (
              <div className="md:w-1/4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                  {/* Subtotal */}
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>

                  {/* Delivery Fee */}
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Delivery Fee</span>
                    <span>
                      ${cart.length > 0 ? deliveryFee.toFixed(2) : "0.00"}
                    </span>
                  </div>

                  {/* Total Price */}
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Checkout button */}
                  <Link
                    to="/checkout"
                    className="block bg-orange-500 text-white text-center py-2 rounded-lg hover:bg-orange-600 mb-4"
                  >
                    Proceed to Checkout
                  </Link>

                  {/* Clear Cart button */}
                  <button
                    onClick={handleClearCart}
                    className="block bg-gray-700 text-white text-center py-2 rounded-lg hover:bg-gray-600 w-full cursor-pointer"
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Continue shopping link */}
                <Link
                  to="/"
                  className="block bg-gray-700 text-white text-center py-2 rounded-lg hover:bg-gray-600 w-full mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
