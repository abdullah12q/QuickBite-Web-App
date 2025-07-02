import ProductForm from "./ProductForm";
import { useMutation } from "@tanstack/react-query";
import { addProduct, queryClient } from "../util/http";
import Modal from "./Modal";
import toast from "react-hot-toast";

export default function NewProduct({ onDone }) {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully!");
      onDone();
    },
  });

  function handleSubmit(formData) {
    mutate(formData);
  }

  return (
    <Modal onClose={onDone}>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-orange-500">
          Add New Product
        </h2>

        <ProductForm onSubmit={handleSubmit}>
          {isPending && (
            <p className="text-gray-400 text-center">Adding the product...</p>
          )}
          {!isPending && (
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 text-gray-300 hover:text-gray-100 font-medium text-sm transition-colors duration-150 cursor-pointer"
                onClick={onDone}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors duration-150 cursor-pointer"
              >
                Add Product
              </button>
            </div>
          )}
        </ProductForm>

        {isError && (
          <div className="py-6 text-center bg-gray-900 rounded-md">
            <p className="text-red-500 text-lg font-medium">
              {error.message || "Failed to add the product."}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
