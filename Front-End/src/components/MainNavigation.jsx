import { Form, Link, NavLink, useRouteLoaderData } from "react-router-dom";
import { getIsAdmin } from "../util/auth";
import { useCart } from "../context/CartContext";

export default function MainNavigation() {
  const token = useRouteLoaderData("root");
  const isAdmin = getIsAdmin();
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 z-50 border-b border-gray-700">
      <nav className="flex justify-between items-center px-5">
        <div className="flex items-center gap-2">
          <img
            src="/logo-removebg-preview.png"
            alt="QuickBite Logo"
            className="h-16 w-auto object-contain"
          />
          <Link to="/" className="text-orange-500 text-xl font-bold">
            QuickBite
          </Link>
        </div>
        <ul className="flex items-center gap-5">
          <li>
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
          </li>
          {!isAdmin && (
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500"
                    : "text-gray-400 hover:text-orange-500"
                }
              >
                Cart({cartCount})
              </NavLink>
            </li>
          )}
          {!token && !isAdmin && (
            <>
              <li>
                <Link
                  to="/auth?mode=login"
                  className="text-gray-400 hover:text-orange-500"
                >
                  Login
                </Link>
              </li>
              <li>
                <button className="bg-orange-500 text-gray-300 px-4 py-2 rounded-md hover:bg-orange-600">
                  <Link to="/auth?mode=register">Register</Link>
                </button>
              </li>
            </>
          )}
          {token && !isAdmin && (
            <li>
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
            </li>
          )}
          {isAdmin && (
            <li>
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
            </li>
          )}
          {(token || isAdmin) && (
            <li>
              <Form method="post" action="/logout">
                <button className="text-gray-400 hover:text-orange-500 cursor-pointer">
                  Logout
                </button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
