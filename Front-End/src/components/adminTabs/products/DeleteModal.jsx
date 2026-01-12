import { useMutation } from "@tanstack/react-query";
import { deleteProduct, queryClient } from "../../../util/http";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import Modal from "../../ui/Modal";

export default function DeleteModal({
  isDeleting,
  setIsDeleting,
  productToDelete,
  setProductToDelete,
}) {
  const {
    mutate: deletingProduct,
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

  function handleCancelDelete() {
    setProductToDelete(null);
    setIsDeleting(false);
  }

  function handleDelete() {
    if (productToDelete) {
      deletingProduct(productToDelete);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isDeleting && (
        <Modal onClose={handleCancelDelete}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Are you sure you want to delete this product?
            </h2>
            {isPendingDelete && (
              <p className="text-gray-400 text-center">Deleting...</p>
            )}
            {!isPendingDelete && (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 text-gray-300 hover:text-gray-100 text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm cursor-pointer"
                >
                  Delete Product
                </button>
              </div>
            )}
            {isDeletingError && (
              <p className="text-red-500 text-center">{deleteError.message}</p>
            )}
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
