import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, getProducts, queryClient } from "../util/http";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NewProduct from "../components/NewProduct";
import EditProduct from "../components/EditProduct";

import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isOpenedNew, setIsOpenedNew] = useState(false);
  const [isOpenedEdit, setIsOpenedEdit] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const {
    data: products = [],
    isPending: isPendingProducts,
    isError: isProductsError,
    error: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const {
    mutate,
    isPending: isPendingDelete,
    isError: isDeletingError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!");
      setIsDeleting(false);
      setProductToDelete(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete product");
      setIsDeleting(false);
      setProductToDelete(null);
    },
  });

  function handleEditProduct(id) {
    setProductToEdit(id);
    setIsOpenedEdit(true);
  }

  function handleStartDelete(id) {
    setProductToDelete(id);
    setIsDeleting(true);
  }

  function handleCancelDelete() {
    setProductToDelete(null);
    setIsDeleting(false);
  }

  function handleDelete() {
    if (productToDelete) {
      mutate(productToDelete);
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 mt-14">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-orange-500 tracking-tight">
          Admin Dashboard
        </h1>
        <button
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 cursor-pointer"
          onClick={() => setIsOpenedNew(true)}
        >
          Add Product
        </button>
      </div>
      <AnimatePresence mode="wait">
        {isOpenedNew && <NewProduct onDone={() => setIsOpenedNew(false)} />}
      </AnimatePresence>

      {/* Products Management Section */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500 }}
        className="bg-linear-to-r from-gray-600 to-gray-900 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-300">
            Products Management
          </h2>
          <p className="text-sm text-gray-50 mt-1">
            Add, edit, or remove products from your menu
          </p>
        </div>
        <div className="p-6">
          {isPendingProducts && (
            <div className="py-12 text-center">
              <LoadingSpinner />
            </div>
          )}

          {isProductsError && (
            <div className="py-12 text-center">
              <p className="text-red-500 text-2xl">
                {productsError.message || "Failed to fetch products"}
              </p>
            </div>
          )}

          {!isPendingProducts && !isProductsError && (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-stone-500">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-stone-500 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-50">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-50">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-50 text-right">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-3">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm cursor-pointer"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleStartDelete(product.id)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                        <AnimatePresence mode="wait">
                          {isOpenedEdit && productToEdit === product.id && (
                            <EditProduct
                              onDone={() => setIsOpenedEdit(false)}
                              id={product.id}
                            />
                          )}
                        </AnimatePresence>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>

      {/* (NewProduct, EditProduct) */}
      <Outlet />

      <AnimatePresence mode="wait">
        {isDeleting && (
          <Modal onClose={handleCancelDelete}>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">
                Are you sure you want to delete this product?
              </h2>
              {isPendingDelete && (
                <p className="text-gray-400 text-center">
                  Deleting the product...
                </p>
              )}
              {!isPendingDelete && (
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-300 hover:text-gray-100 font-medium text-sm transition-colors duration-150 cursor-pointer"
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors duration-150 cursor-pointer"
                    onClick={handleDelete}
                  >
                    Delete Product
                  </button>
                </div>
              )}
              {isDeletingError && (
                <div className="py-6 text-center bg-gray-900 rounded-md">
                  <p className="text-red-500 text-lg font-medium">
                    {deleteError.message || "Failed to delete the product."}
                  </p>
                </div>
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
