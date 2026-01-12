import { useMutation, useQuery } from "@tanstack/react-query";
import { getProduct, queryClient, updateProduct } from "../../util/http";
import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import ProductForm from "../forms/ProductForm";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function EditProduct({ onDone, id }) {
  const {
    data: product,
    isPending: isPendingProduct,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const {
    mutate,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: updateProduct,
    onMutate: async (newData) => {
      const previousProduct = queryClient.getQueryData(["product", id]);
      const newProduct = newData.formData;

      await queryClient.cancelQueries({ queryKey: ["product", id] });
      queryClient.setQueryData(["product", id], newProduct);
      return { previousProduct };
    },
    onError: (error, newProduct, context) => {
      queryClient.setQueryData(["product", id], context.previousProduct);
      toast.error("Failed to update product.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      toast.success("Product updated successfully!");
      onDone();
    },
  });

  function handleSubmit(formData) {
    mutate({ id, formData });
  }

  return (
    <Modal onClose={onDone}>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-orange-500">Edit Product</h2>

        {isPendingProduct && (
          <div className="text-center">
            <LoadingSpinner />
          </div>
        )}
        {isProductError && (
          <div className="py-6 text-center bg-gray-900 rounded-md">
            <p className="text-red-500 text-lg font-medium">
              {productError.message || "Failed to load product."}
            </p>
          </div>
        )}

        {product && (
          <ProductForm onSubmit={handleSubmit} inputData={product}>
            {isUpdating && (
              <p className="text-gray-400 text-center">Updating product...</p>
            )}
            {!isUpdating && (
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onDone}
                  className="px-4 py-2 text-gray-300 hover:text-gray-100 font-medium text-sm transition-colors duration-150 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors duration-150 cursor-pointer"
                >
                  Update Product
                </button>
              </div>
            )}
          </ProductForm>
        )}

        {isUpdateError && (
          <div className="py-6 text-center bg-gray-900 rounded-md">
            <p className="text-red-500 text-lg font-medium">
              {updateError.message || "Failed to update the product."}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
