import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./util/http";
import { checkAuthLoader, checkIsAdminLoader, tokenLoader } from "./util/auth";

import Root from "./pages/Root";
import HomePage from "./pages/Home";
import { action as logoutAction } from "./pages/Logout";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import ProductDetails from "./components/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <CartPage />,
        loader: checkAuthLoader,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
        loader: checkAuthLoader,
      },
      {
        path: "user/dashboard",
        element: <UserDashboard />,
        loader: checkAuthLoader,
      },
      {
        path: "admin/dashboard",
        element: <AdminDashboard />,
        loader: checkIsAdminLoader,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        duration={10000}
        toastOptions={{
          style: {
            background: "#222",
            color: "#FFA500",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
