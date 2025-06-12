import { QueryClient } from "@tanstack/react-query";
import { getAuthToken } from "./auth";

export const queryClient = new QueryClient();

const token = getAuthToken();

export async function authenticate({ mode, formData }) {
  if (mode !== "login" && mode !== "register") {
    throw new Error("Invalid mode");
  }

  const response = await fetch(`http://localhost:5050/auth/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Authentication failed");
  }

  return data;
}

export async function getProducts() {
  const response = await fetch(
    "http://localhost:5050/api/product/getAllProduct"
  );
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch products");
  }

  //3shan 3mr 3aml el db bt3t el products kol awl 7rf feha capital
  const fixedProducts = data.products.map((product) => ({
    id: product._id,
    category: product.Category,
    name: product.Name,
    price: product.Price,
    image: `http://localhost:5050/images/${product.Image}`,
    description: product.Description,
  }));

  return fixedProducts;
}

export async function getProduct(id) {
  const response = await fetch(
    `http://localhost:5050/api/product/getProduct?id=${id}`
  );
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to get product");
  }

  //3shan 3mr 3aml el db bt3t el products kol awl 7rf feha capital
  const product = data.product;
  const fixedProduct = {
    id: product._id,
    category: product.Category,
    name: product.Name,
    price: product.Price,
    image: `http://localhost:5050/images/${product.Image}`,
    description: product.Description,
  };

  return fixedProduct;
}

export async function addProduct(formData) {
  const response = await fetch("http://localhost:5050/api/product/add", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to add product");
  }

  return data;
}

export async function updateProduct({ id, formData }) {
  const response = await fetch(
    `http://localhost:5050/api/product/update?id=${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to update product");
  }

  return data.updatedProduct;
}

export async function deleteProduct(id) {
  const response = await fetch(
    `http://localhost:5050/api/product/delete?id=${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to delete product");
  }
}

export async function getUserOrders(userId) {
  const response = await fetch(
    `http://localhost:5050/order/getUserOrders?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data.userOrders;
}
