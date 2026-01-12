import { QueryClient } from "@tanstack/react-query";
import { getAuthToken } from "./auth";

export const queryClient = new QueryClient();

export async function authenticate({ mode, formData }) {
  try {
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
  } catch (error) {
    throw new Error("Authentication failed: " + error.message);
  }
}

export async function getProducts(searchTerm = "") {
  try {
    const response = await fetch(
      "http://localhost:5050/api/product/getAllProducts"
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
      avalability: product.Avalability,
    }));

    if (searchTerm) {
      return fixedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return fixedProducts;
  } catch (error) {
    throw new Error("Could not fetch products: " + error.message);
  }
}

export async function getProduct(id) {
  try {
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
      avalability: product.Avalability,
    };

    return fixedProduct;
  } catch (error) {
    throw new Error("Could not get product: " + error.message);
  }
}

export async function addProduct(formData) {
  const token = getAuthToken();

  try {
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
  } catch (error) {
    throw new Error("Could not add product: " + error.message);
  }
}

export async function updateProduct({ id, formData }) {
  const token = getAuthToken();

  try {
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
  } catch (error) {
    throw new Error("Could not update product: " + error.message);
  }
}

export async function deleteProduct(id) {
  const token = getAuthToken();

  try {
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
  } catch (error) {
    throw new Error("Could not delete product: " + error.message);
  }
}

export async function updateAvalability(id) {
  const token = getAuthToken();

  try {
    const response = await fetch(
      `http://localhost:5050/api/product/updateAvalability?id=${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to update Avalability");
    }
  } catch (error) {
    throw new Error("Could not update Avalability: " + error.message);
  }
}

export async function getUserOrders(userId) {
  const token = getAuthToken();

  try {
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
  } catch (error) {
    throw new Error("Could not fetch orders: " + error.message);
  }
}

export async function getAllOrders() {
  const response = await fetch("http://localhost:5050/order/getAllOrders");

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch orders");
  }

  const resData = await response.json();
  return resData.orders;
}

export async function updateOrderStatus({ orderId, status }) {
  const response = await fetch("http://localhost:5050/order/status", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId, status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update order status");
  }

  return response.json();
}

export async function getAllUsers() {
  const response = await fetch("http://localhost:5050/auth/getAllUsers");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch users");
  }
  const resData = await response.json();
  return resData.users;
}

export async function toggleUserAvailability({ userId }) {
  const response = await fetch(
    `http://localhost:5050/auth/toggleUserAvailability`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update availability");
  }
  return response.json();
}
