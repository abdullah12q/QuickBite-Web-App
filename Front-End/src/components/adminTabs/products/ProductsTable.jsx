import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getProducts,
  queryClient,
  updateAvalability,
} from "../../../util/http";
import toast from "react-hot-toast";
import EditProduct from "../../products/EditProduct";
import { AnimatePresence } from "framer-motion";
import LoadingSpinner from "../../ui/LoadingSpinner";

export default function ProductsTable({ setProductToDelete, setIsDeleting }) {
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

  const { mutate: updatingAvalability } = useMutation({
    mutationFn: updateAvalability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product Avalability updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update product Avalability");
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

  function handleUpdateAvalability(id) {
    updatingAvalability(id);
  }

  return (
    <>
      {isPendingProducts && (
        <div className="py-12 text-center">
          <LoadingSpinner />
        </div>
      )}
      {isProductsError && (
        <p className="text-red-500 text-center">{productsError.message}</p>
      )}
      {!isPendingProducts && !isProductsError && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-stone-500">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-stone-500 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-50">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-50">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-50">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleStartDelete(product.id)}
                        className="text-red-600 hover:text-red-800 text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleUpdateAvalability(product.id)}
                        className={`text-sm cursor-pointer rounded-md px-2 ${
                          product.avalability
                            ? "text-green-600 bg-green-200"
                            : "text-red-600 bg-red-200"
                        }`}
                      >
                        {product.avalability ? "Available" : "Unavailable"}
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
    </>
  );
}
