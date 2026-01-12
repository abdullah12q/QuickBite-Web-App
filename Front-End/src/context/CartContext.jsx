import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const areExtrasEqual = (a = {}, b = {}) => {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (let key of keys) {
    if (Boolean(a[key]) !== Boolean(b[key])) {
      return false;
    }
  }
  return true;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find(
        (item) =>
          item.id === action.payload.id &&
          areExtrasEqual(item.extras, action.payload.extras)
      );

      if (existingItem) {
        return state.map((item) =>
          item.cartItemId === existingItem.cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...state,
        {
          ...action.payload,
          cartItemId: `${action.payload.id}-${Date.now()}-${Math.random()}`,
          quantity: 1,
          extras: action.payload.extras || {},
        },
      ];
    }

    case "REMOVE_FROM_CART":
      return state.filter(
        (item) => item.cartItemId !== action.payload.cartItemId
      );

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.cartItemId === action.payload.cartItemId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });

  const removeFromCart = (cartItemId) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: { cartItemId } });

  const updateQuantity = (cartItemId, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { cartItemId, quantity } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
