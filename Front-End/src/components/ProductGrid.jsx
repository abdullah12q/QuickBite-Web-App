import { useState } from "react";
import ProductCard from "./ProductCard";
import CategoryButton from "./CategoryButton";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../util/http";
import LoadingSpinner from "./LoadingSpinner";
import useDebounce from "../hooks/useDebounce";

export default function ProductGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: products = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const {
    data: searchResults = [],
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useQuery({
    queryKey: ["products", "search", debouncedSearchTerm],
    queryFn: () => getProducts(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
  });

  function handleClick(category) {
    setActiveCategory(category);
    setSearchTerm("");
  }

  let content;

  if (isError || isSearchError) {
    const errorMessage =
      error?.message || searchError?.message || "Failed to fetch products";

    content = (
      <div className="py-12 text-center">
        <p className="text-red-500 text-2xl">{errorMessage}</p>
      </div>
    );
  }

  let displayProducts = [];
  let emptyMessage = "";

  if (!isPending && !isError && !searchTerm) {
    displayProducts = activeCategory
      ? products.filter((product) => product.category === activeCategory)
      : products;
    emptyMessage = "No products found in this category.";
  } else if (!isSearchLoading && !isSearchError && searchTerm) {
    displayProducts = activeCategory
      ? searchResults.filter((product) => product.category === activeCategory)
      : searchResults;
    emptyMessage = "No products found matching your search.";
  }

  if (displayProducts.length > 0) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } else if (
    displayProducts.length === 0 &&
    (debouncedSearchTerm || activeCategory)
  ) {
    content = (
      <div className="py-12 text-center">
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex justify-between">
        <div className="flex overflow-x-auto pb-2 gap-2">
          {["All", "Burgers", "Pizzas", "Drinks", "Desserts"].map((cat) => (
            <CategoryButton
              key={cat}
              activeCategory={activeCategory}
              category={cat === "All" ? null : cat}
              handleClick={handleClick}
              text={cat}
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 mr-12 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-orange-500 focus:outline-none transition duration-300"
        />
      </div>
      {(isSearchLoading || isPending) && <LoadingSpinner />}
      {content}
    </div>
  );
}
