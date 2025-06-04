import { createContext, useContext, useReducer } from "react";

// Create a context for the cart
const CartContext = createContext();

// Reducer function to handle cart actions and update the state accordingly
const cartReducer = (state, action) => {
  switch (action.type) {
    // Add item to cart
    case "ADD_TO_CART":
      // Check if the item already exists in the cart
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If it exists, increase its quantity by 1
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If it doesn't exist, add it with quantity = 1
      return [...state, { ...action.payload, quantity: 1 }];

    // Remove an item from the cart
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);

    // Update the quantity of an item in the cart
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    // Clear the entire cart
    case "CLEAR_CART":
      return [];

    // Return current state if action type doesn't match
    default:
      return state;
  }
};

// Provider component to wrap your app and provide cart state/functions
export const CartProvider = ({ children }) => {
  // useReducer to manage cart state with the reducer function
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Action dispatchers
  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });

  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // Pass state and action functions through context
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context in other components
export const useCart = () => useContext(CartContext);
