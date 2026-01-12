import { Form, Link, NavLink, useRouteLoaderData } from "react-router-dom";
import { getIsAdmin } from "../../util/auth";
import { useCart } from "../../context/CartContext";

import { AnimatePresence, motion } from "framer-motion";

export default function MainNavigation() {
  const token = useRouteLoaderData("root");
  const isAdmin = getIsAdmin();
  const { cart, clearCart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 z-50 border-b border-gray-700">
      <nav className="flex justify-between items-center px-5">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src="/logo-removebg-preview.png"
              alt="QuickBite Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>
          <Link to="/" className="text-orange-500 text-xl font-bold">
            QuickBite
          </Link>
        </div>
        <ul className="flex items-center gap-5">
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring" }}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-orange-500"
              }
              end
            >
              Home
            </NavLink>
          </motion.li>
          {!isAdmin && (
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500"
                    : "text-gray-400 hover:text-orange-500"
                }
              >
                Cart(
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={cartCount}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ type: "spring" }}
                    className="inline-block"
                  >
                    {cartCount}
                  </motion.span>
                </AnimatePresence>
                )
              </NavLink>
            </motion.li>
          )}
          {!token && !isAdmin && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <Link
                  to="/auth?mode=login"
                  className="text-gray-400 hover:text-orange-500"
                >
                  Login
                </Link>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
                className="bg-orange-500 text-gray-300 px-4 py-2 rounded-md hover:bg-orange-600"
              >
                <Link to="/auth?mode=register">Register</Link>
              </motion.button>
            </>
          )}
          {token && !isAdmin && (
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <NavLink
                to="/user/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500"
                    : "text-gray-400 hover:text-orange-500"
                }
              >
                Dashboard
              </NavLink>
            </motion.li>
          )}
          {isAdmin && (
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500"
                    : "text-gray-400 hover:text-orange-500"
                }
              >
                Admin Dashboard
              </NavLink>
            </motion.li>
          )}
          {(token || isAdmin) && (
            <Form method="post" action="/logout">
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
                className="text-gray-400 hover:text-orange-500 cursor-pointer"
                onClick={clearCart}
              >
                Logout
              </motion.button>
            </Form>
          )}
        </ul>
      </nav>
    </header>
  );
}
