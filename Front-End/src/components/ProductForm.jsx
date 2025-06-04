import { useEffect, useState } from "react";

export default function ProductForm({ inputData, onSubmit, children }) {
  const [imagePreview, setImagePreview] = useState(inputData?.image || null);

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(inputData?.image || null);
    }
  }

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== inputData?.image) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, inputData?.image]);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    onSubmit(formData);
  }

  const categories = [
    { id: "Burgers", name: "Burgers" },
    { id: "Pizzas", name: "Pizzas" },
    { id: "Drinks", name: "Drinks" },
    { id: "Desserts", name: "Desserts" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 space-y-6 max-w-lg mx-auto"
    >
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={inputData?.name ?? ""}
          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-150"
          required
        />
      </div>

      {/* Image Upload and Preview */}
      <div className="space-y-2">
        <label htmlFor="image" className="block text-sm font-medium text-white">
          Product Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required={inputData?.image ? false : true}
          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-500 file:text-white file:hover:bg-orange-600 transition-colors duration-150 file:cursor-pointer"
        />
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Product preview"
              className="w-full h-48 object-cover rounded-md border border-gray-600"
            />
          </div>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ""}
          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-150 resize-y"
          rows="4"
          required
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <label htmlFor="price" className="block text-sm font-medium text-white">
          Price ($)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          defaultValue={inputData?.price ?? ""}
          step="0.01"
          min="0"
          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-150"
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-white"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue={inputData?.category ?? ""}
          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-150 cursor-pointer"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4">{children}</div>
    </form>
  );
}
