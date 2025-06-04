import { useState } from "react";
import ProductCard from "./ProductCard";
import CategoryButton from "./CategoryButton";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../util/http";
import LoadingSpinner from "./LoadingSpinner";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState(null);

  const {
    data: products = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  let content;

  if (isPending) {
    content = <LoadingSpinner />;
  }

  if (isError) {
    content = (
      <div className="py-12 text-center">
        <p className="text-red-500 text-2xl">
          {error.message || "Failed to fetch products"}
        </p>
      </div>
    );
  }

  if (!isPending && !isError) {
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
          <p className="text-gray-400">
            No products available in this category.
          </p>
        </div>
      );
  }

  function handleClick(category) {
    setActiveCategory(category);
  }

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2">
        <CategoryButton
          activeCategory={activeCategory}
          category={null}
          handleClick={handleClick}
          text={"All"}
        />
        <CategoryButton
          activeCategory={activeCategory}
          category={"Burgers"}
          handleClick={handleClick}
          text={"Burgers"}
        />
        <CategoryButton
          activeCategory={activeCategory}
          category={"Pizzas"}
          handleClick={handleClick}
          text={"Pizza"}
        />
        <CategoryButton
          activeCategory={activeCategory}
          category={"Drinks"}
          handleClick={handleClick}
          text={"Drinks"}
        />
        <CategoryButton
          activeCategory={activeCategory}
          category={"Desserts"}
          handleClick={handleClick}
          text={"Desserts"}
        />
      </div>
      {content}
    </div>
  );
}
