import { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import CategoryButton from "./CategoryButton";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../util/http";
import LoadingSpinner from "./LoadingSpinner";

export default function ProductGrid() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();
  const [activeCategory, setActiveCategory] = useState(null);

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
    isPending: isSearchPending,
    isError: isSearchError,
    error: searchError,
  } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => getProducts(searchTerm),
    enabled: !!searchTerm,
  });

  function handleClick(category) {
    setActiveCategory(category);
    setSearchTerm(null);
    searchElement.current.value = "";
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearchTerm(searchElement.current.value.trim());
  }

  let content;

  if (isPending || isSearchPending) {
    content = <LoadingSpinner />;
  }

  if (isError || isSearchError) {
    content = (
      <div className="py-12 text-center">
        <p className="text-red-500 text-2xl">
          {(isError && error.message) || "Failed to fetch products"}
          {(isSearchError && searchError.message) ||
            "Failed to fetch searched products"}
        </p>
      </div>
    );
  }

  if (!isPending && !isError && !searchTerm) {
    const filteredProducts = activeCategory
      ? products.filter((product) => product.category === activeCategory)
      : products;

    content =
      filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-400">No products found in this category.</p>
        </div>
      );
  } else if (!isSearchPending && !isSearchError && searchTerm) {
    const filteredSearchResults = activeCategory
      ? searchResults.filter((product) => product.category === activeCategory)
      : searchResults;
    content =
      filteredSearchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-400">
            No products found matching your search.
          </p>
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
        <form onSubmit={handleSearchSubmit} className="mr-12">
          <input
            type="search"
            placeholder="Search for a product"
            ref={searchElement}
            className="px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-orange-500 focus:outline-none transition duration-300"
          />
        </form>
      </div>
      {content}
    </div>
  );
}
