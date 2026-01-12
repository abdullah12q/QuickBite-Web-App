import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import NewProduct from "../components/products/NewProduct";
import ProductsTable from "../components/adminTabs/products/ProductsTable";
import OrdersTable from "../components/adminTabs/OrdersTable";
import UsersTable from "../components/adminTabs/UsersTable";
import DeleteModal from "../components/adminTabs/products/DeleteModal";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isOpenedNew, setIsOpenedNew] = useState(false);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 mt-14">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-orange-500 tracking-tight">
          Admin Dashboard
        </h1>

        {/* Tab Switcher */}
        <div className="bg-gray-800 p-1 rounded-lg flex space-x-1">
          {["products", "orders", "users"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-500 capitalize cursor-pointer ${
                activeTab === tab
                  ? "bg-gray-700 text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isOpenedNew && <NewProduct onDone={() => setIsOpenedNew(false)} />}
      </AnimatePresence>

      <motion.div
        layout
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" }}
        className="bg-linear-to-r from-gray-600 to-gray-900 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-300 capitalize">
              {activeTab} Management
            </h2>
            <p className="text-sm text-gray-50 mt-1">
              {activeTab === "products" && "Add, edit, or remove products"}
              {activeTab === "orders" && "View and update customer orders"}
              {activeTab === "users" && "Manage users and delivery staff"}
            </p>
          </div>

          {activeTab === "products" && (
            <button
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 cursor-pointer"
              onClick={() => setIsOpenedNew(true)}
            >
              Add Product
            </button>
          )}
        </div>

        <div className="p-6">
          {/* ================= PRODUCTS TABLE ================= */}
          {activeTab === "products" && (
            <ProductsTable
              setProductToDelete={setProductToDelete}
              setIsDeleting={setIsDeleting}
            />
          )}

          {/* ================= ORDERS TABLE ================= */}
          {activeTab === "orders" && <OrdersTable activeTab={activeTab} />}

          {/* ================= USERS TABLE (NEW) ================= */}
          {activeTab === "users" && <UsersTable activeTab={activeTab} />}
        </div>
      </motion.div>

      <Outlet />

      {/* Delete Modal */}
      <DeleteModal
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        productToDelete={productToDelete}
        setProductToDelete={setProductToDelete}
      />
    </div>
  );
}
