To run the backend sucessfully isa, do the following:

1- Be sure that your path end is QuickBite-Web-App/Back-End
2- in terminal (ctrl + `) run the following commands,
3- npm i
4- npm i nodemon express bcrypt body-parser dotenv jsonwebtoken mongodb mongoose multer cors validator
5- to run the backend server run the following command,
6- npm run server

---

To run the frontend sucessfully isa, do the following:

1- Be sure that your path end is QuickBite-Web-App/Front-End
2- in terminal (ctrl + `) run the following commands,
3- npm i
4- npm i react-router-dom eslint-plugin-react react-hot-toast @tanstack/react-query yup tailwindcss @tailwindcss/vite react-icons formik framer-motion
5- to run the web app on the browser run the following command,
6- npm run dev

# Food Ordering Web App Documentation

## Table of Contents

- [Overview](#overview)
- [Project Purpose](#project-purpose)
- [Tech Stack](#tech-stack)
  - [Frontend Dependencies](#frontend-dependencies)
    - [Core Libraries](#core-libraries)
    - [Routing](#routing)
    - [Data Fetching](#data-fetching)
    - [Notifications](#notifications)
    - [Icons](#icons)
    - [Styling](#styling)
    - [Animations](#animations)
    - [Form Validation & User Inputs](#form-validation--user-inputs)
    - [Code Quality](#code-quality)
  - [Backend Dependencies](#backend-dependencies)
- [Key Features](#key-features)
  - [Product Browsing and Details](#product-browsing-and-details)
  - [Cart Management](#cart-management)
  - [Feedback System](#feedback-system)
  - [Checkout Process](#checkout-process)
  - [Admin Add/Edit Product](#admin-addedit-product)
- [Component Details (Most Important)](#component-details-most-important)
  - [CheckoutPage](#checkoutpage)
  - [ProductDetails](#productdetails)
  - [EditProduct](#editproduct)
  - [NewProduct](#newproduct)
- [API Endpoints](#api-endpoints)
  - [USER API](#user-api)
    - [Base URL](#base-url)
    - [Endpoints](#endpoints)
    - [Parameters for Registration](#parameters-for-registration)
    - [Parameters for Logging In](#parameters-for-logging-in)
    - [Parameters for Getting User](#parameters-for-getting-user)
    - [Parameters for Updating Info](#parameters-for-updating-info)
  - [ORDER API](#order-api)
    - [Base URL](#base-url-1)
    - [Endpoints](#endpoints-1)
    - [Parameters](#parameters)
  - [PRODUCT API](#product-api)
    - [Base URL](#base-url-2)
    - [Endpoints](#endpoints-2)
    - [Parameters for Adding a Product](#parameters-for-adding-a-product)
    - [Parameters for Updating a Product](#parameters-for-updating-a-product)
    - [Parameters for Deleting a Product](#parameters-for-deleting-a-product)
    - [Parameters for Deleting All Products](#parameters-for-deleting-all-products)
    - [Parameters for Getting a Product](#parameters-for-getting-a-product)
    - [Parameters for Getting All Products](#parameters-for-getting-all-products)
  - [FEEDBACK API](#feedback-api)
    - [Base URL](#base-url-3)
    - [Endpoints](#endpoints-3)
    - [Parameters for Leaving Feedback](#parameters-for-leaving-feedback)
    - [Parameters for Getting Feedback](#parameters-for-getting-feedback)

## Overview

This project is a React-based food delivery application named QuickBite that allows users to browse products, add them to a cart, leave feedback, edit profile information, add and edit products (admin functionality), and complete checkout. It uses a modern frontend stack with Tailwind CSS for styling and responsive design compatible with all devices, React Query for data fetching and mutations, Context API for state management, and Framer Motion for smooth and unique animations and much more.

## Project Purpose

The application enables:

- Users to register and login to be able to place order.
- Users to browse products, view product details, add to a cart, and place order.
- Users to leave feedback and ratings for products.
- Users to edit profile information in user dashboard.
- Admin to add and edit product details in admin dashboard.
- A checkout process with delivery information and payment method selection.

## Tech Stack

### Frontend Dependencies

The following dependencies are used in the frontend:

#### Core Libraries

- `react`: Core framework for building UI components.
- `react-dom`: For rendering React components to the DOM.

#### Routing

- `react-router-dom`: For **routing** and **navigation** (`RouterProvider`, `useNavigate`, `useParams`).

#### Data Fetching

- `@tanstack/react-query`: For data fetching, caching, and mutations (`useQuery`, `useMutation`).

#### Notifications

- `react-hot-toast`: For toast notifications (e.g., "Welcome back admin!").

#### Icons

- `react-icons`: For icons (e.g., `FaStar` for ratings).

#### Styling

- `tailwindcss`: A CSS framework used for utility-first CSS styling.
- **Theme**: Dark theme with orange accents (e.g., `bg-gray-900`, `text-orange-500`).
- **Responsive Design**: Uses Tailwind’s responsive utilities (e.g., `lg:grid-cols-3`).
- **Customizations**:
  - Inputs and buttons use consistent styling (e.g., `bg-gray-700`, `rounded-md`).
  - Hover effects with `hover:bg-orange-600`, transitions with `transition duration-300`.

#### Animations

- `framer-motion`: Used to animate components and enhance user experience with smooth entrance/exit transitions, motion variants, and animated navigation.  
  Examples include animated modals, smooth page transitions, and button hover effects across components like `Home` and `CategoryButton`.

#### Form Validation & User Inputs

- `Formik`: Manage **form state and submission** (input values, touched fields, errors).
- `Yup`: Schema-based validation using the `validationSchema` prop.

#### Code Quality

- `eslint`: A linting tool for identifying and fixing code quality issues, enforcing consistent coding styles across the project (e.g., ensuring proper React hooks usage in `CheckoutPage`, `ProductDetails`, and `EditProduct`, and maintaining uniformity in code formatting).

### Backend Dependencies

The following dependencies are used in the backend:

- `nodemon`: A development tool that automatically restarts the Node.js server on file changes, improving development efficiency.
- `express`: A web framework for Node.js used to build the RESTful API, handling routes and middleware for endpoints like `/auth/register`, `/order/place`, `/api/product/add`, and `/feedback/leaveFeedback`.
- `bcrypt`: A library for hashing passwords, used to securely store user passwords during registration (e.g., hashing the password in the `/auth/register` endpoint).
- `body-parser`: Middleware for parsing incoming request bodies in Express, used to handle JSON data in requests (e.g., parsing the request body in `/auth/register`, `/order/place`, `/api/product/add`, and `/feedback/leaveFeedback`).
- `dotenv`: A module to load environment variables from a `.env` file, used to manage sensitive configurations like database URIs and JWT secrets.
- `jsonwebtoken`: A library for generating and verifying JSON Web Tokens (JWT), used for user authentication (e.g., generating a token in the `/auth/register` and `/auth/login` endpoints).
- `mongodb`: The official MongoDB driver for Node.js, used to connect to the MongoDB database and perform operations (though `mongoose` is primarily used for ORM).
- `mongoose`: An Object Data Modeling (ODM) library for MongoDB, used to define schemas and interact with the database (e.g., user, order, product, and feedback schemas for `/auth`, `/order`, `/api/product`, and `/feedback` endpoints).
- `multer`: Middleware for handling `multipart/form-data`, used for uploading product images in the `/api/product/add` and `/api/product/update` endpoints, storing images in the `uploads/` directory with timestamped filenames.
- `cors`: Middleware to enable Cross-Origin Resource Sharing, allowing the frontend (e.g., running on a different port) to communicate with the backend API.
- `validator`: A library for string validation, used to validate user input (e.g., ensuring email format and password strength in the `/auth/register` and `/auth/login` endpoints).

## Key Features

### Product Browsing and Details

- Users can view product details (`ProductDetails` component).
- Displays product image, name, category, price, description, and average rating.
- Allows users to add products to the cart and leave feedback with a rating (1-5).

### Cart Management

- Managed via `CartContext`.
- Users can add/remove items, update quantities, and clear the cart.
- Cart data is used in the checkout process.

### Feedback System

- Integrated into `ProductDetails`.
- Users can submit feedback with a username, comment, rating (1-5), and date.
- Feedback is displayed with star ratings using `FaStar` from `react-icons`.

### Checkout Process

- Implemented in `CheckoutPage`.
- Users enter delivery details (name, phone, address) and select a payment method (Credit Card, PayPal, Cash on Delivery).
- Displays order summary (items, subtotal, delivery fee, total).
- Submits the order, clears the cart, and navigates to the homepage.

### Admin Add/Edit Product

- Implemented in `NewProduct/EditProduct`.
- Admin can add/edit product via a modal form.
- Uses React Query for optimistic updates to ensure immediate UI feedback after submission.

## Component Details (Most Important)

### CheckoutPage

- **Path**: `src/Pages/Checkout.jsx`
- **Purpose**: Handles the checkout process, including delivery information input and order summary display.
- **State**:
  - `formData`: Stores delivery details (`name`, `phone`, `address`) and `paymentMethod`.
  - `subtotal`: Calculated cart total.
- **Features**:
  - Form for entering delivery details and selecting a payment method.
  - Order summary for the cart, subtotal, delivery fee ($50), and total.
  - Submits order and navigates to homepage.
- **Dependencies**:
  - `useCart`: For accessing and clearing cart.
  - `useNavigate`: For navigation.

### ProductDetails

- **Path**: `src/components/ProductDetails.jsx`
- **Purpose**: Displays product details and allows feedback submission.
- **Features**:
  - Shows product info, average rating, and feedback form.
  - Fetches and displays feedback using `useEffect` hook.
  - Displays star ratings using `FaStar` from `react-icons`.
- **Dependencies**:
  - `useEffect`: For fetching product and feedback data.
  - `useCart`: For adding to cart.
  - `useNavigate`, `useParams`: For navigation and product ID.
  - `react-icons`: For star icons.

### EditProduct

- **Path**: `src/components/EditProduct.jsx`
- **Purpose**: Allows admin to edit product details via a modal.
- **Features**:
  - Optimistic updates using React Query to immediately reflect changes.
  - Invalidates queries to refresh product data after updates.
- **Dependencies**:
  - `useQuery`, `useMutation`: For fetching and updating product data.
  - `useNavigate`, `useParams`: For navigation and product ID.
  - `react-hot-toast`: For success/error notifications.

### NewProduct

- **Path**: `src/components/NewProduct.jsx`
- **Purpose**: Allows admin to add a new product via a modal.
- **Features**:
  - Optimistic updates using React Query to immediately reflect changes.
  - Invalidates queries to refresh product data after updates.
- **Dependencies**:
  - `useMutation`: For adding product data.
  - `useNavigate`: For navigation.
  - `react-hot-toast`: For success/error notifications.

## API Endpoints

### USER API

This API is used to register/login users, get user information, and update user info.

#### Base URL

The base URL for all API requests is: `localhost:5050/auth/`

#### Endpoints

- **POST** `/register`: Allows registering using name, email, and password.
- **POST** `/login`: Allows logging in using email and password.
- **GET** `/getUser`: Gets the required user by ID.
- **PUT** `/updateUserInfo`: Updates the user’s name and email.

#### Parameters for Registration

- `name` (required): Name of the user registering.
- `email` (required): Email of the user (must be unique).
- `password` (required): Password of the user (must be strong, length ≥ 8).

**Response:** Returns a JSON object with the following properties:

- `token`: A token valid for 12 hours.
- `success`: Boolean indicating success or failure.
- `message`: Output message.
- `user`: An object of the user with:
  - `id`: The unique identifier of the user.
  - `name`: The name of the user.
  - `password`: Hashed password of the user.
  - `Email`: Email of the user.

**Example Request:**

```json
POST /register
{
  "name": "user",
  "email": "user@gmail.com",
  "password": "password1234"
}
```

**Example Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjgyOTQzNDUzMGQ1NjVhYWNhZjI1OSIsImlhdCI6MTc0NzQ2MjQ2NywiZXhwIjoxNzQ3NTA1NjY3fQ.UKKyMLLIJrwZi8TcllzxwogGD8fAlpWlmG55jE7j5lc",
  "user": {
    "name": "user",
    "email": "user@gmail.com",
    "password": "$2b$10$5Jmz/1i4YHFEF5r9Ttt9YOW2GJpZ6/f.ogKl0qgcvJAuRT8/s7QBm",
    "_id": "682829434530d565aacaf259",
    "__v": 0
  },
  "success": true,
  "message": "User created successfully"
}
```

**Errors:**

- `500 Internal Server Error`: An unexpected error occurred on the server.
- `400 Bad Request`: A client-side input error.

#### Parameters for Logging In

- `email` (required): Email of the user (must be unique).
- `password` (required): Password of the user (must be strong, length ≥ 8).

**Response:** Returns a JSON object with the following properties:

- `token`: A token valid for 12 hours.
- `success`: Boolean indicating success or failure.
- `userID`: An ID of the user.

**Example Request:**

```json
POST /login
{
  "email": "user@gmail.com",
  "password": "password1234"
}
```

**Example Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjgyOTQzNDUzMGQ1NjVhYWNhZjI1OSIsImlhdCI6MTc0NzQ2MjQ2NywiZXhwIjoxNzQ3NTA1NjY3fQ.UKKyMLLIJrwZi8TcllzxwogGD8fAlpWlmG55jE7j5lc",
  "id": "682829434530d565aacaf259"
}
```

**Errors:**

- `500 Internal Server Error`: An unexpected error occurred on the server.
- `401 Unauthorized`: The request lacks valid authentication credentials.

#### Parameters for Getting User

- `userID` (required): ID of the user.

**Response:** Returns a JSON object with the following properties:

- `success`: Boolean indicating success or failure.
- `user`: An object of the user with:
  - `id`: The unique identifier of the user.
  - `name`: The name of the user.
  - `Email`: Email of the user.

**Example Request:**

```
GET /getUser?userId=68273fd956588c6bd45cfa72
```

**Example Response:**

```json
{
  "success": true,
  "user": {
    "name": "user",
    "email": "user@gmail.com",
    "_id": "682829434530d565aacaf259",
    "__v": 0
  }
}
```

**Errors:**

- `500 Internal Server Error`: An unexpected error occurred on the server.
- `404 Not Found`: User was not found.

#### Parameters for Updating Info

- `userID` (required): ID of the user.
- `email` (optional): Email of the user (must be unique).
- `name` (optional): Name of the user.

**Response:** Returns a JSON object with the following properties:

- `success`: Boolean indicating success or failure.
- `message`: Output message.
- `user`: An object of the updated user with:
  - `id`: The unique identifier of the user.
  - `name`: The new name of the user.
  - `Email`: The new email of the user.

**Example Request:**

```
PUT /updateUserInfo?userId=68273fd956588c6bd45cfa72
```

**Example Response:**

```json
{
  "success": true,
  "user": {
    "name": "NEWuser",
    "email": "NEWuser@gmail.com",
    "_id": "682829434530d565aacaf259",
    "__v": 0
  },
  "message": "User information updated successfully"
}
```

**Errors:**

- `500 Internal Server Error`: An unexpected error occurred on the server.
- `404 Not Found`: User was not found.
- `400 Bad Request`: A client-side input error.

### ORDER API

This API is used to place orders for users.

#### Base URL

The base URL for all API requests is: `localhost:5050/order/`

#### Endpoints

- **POST** `/place`: Places an order for a user.

#### Parameters

- `UserID`: ID of the user.
- `Address`: Address to be delivered to.
- `PaymentMethod`: Choice between Card or Cash.
- `Items`: An object of the item with:
  - `id`: The unique identifier of the product.
  - `price`: The price of the product.
  - `quantity`: Number of items of that product.

**Response:** Returns a JSON object with the following properties:

- `Order`: The order of the user.
- `success`: Boolean indicating success or failure.
- `message`: Output message.

**Example Request:**

```json
POST /place
{
  "success": "true",
  "message": "Order created successfully!",
  "paymentMethod": "cash_on_delivery",
  "address": "Madrid Santiago bernabeu",
  "items": [
    {
      "productId": "6812bd7a37a3d12eae5a6b7f",
      "quantity": 2
    },
    {
      "productId": "6813860d787823c5dc7fda3d",
      "quantity": 1
    }
  ],
  "Amount": 510
}
```

**Example Response:**

```json
{
  "userId": "68273fd956588c6bd45cfa72",
  "paymentMethod": "cash_on_delivery",
  "items": [
    {
      "productId": "6812bd7a37a3d12eae5a6b7f",
      "quantity": 2
    },
    {
      "productId": "6813860d787823c5dc7fda3d",
      "quantity": 1
    }
  ]
}
```

**Errors:**

- `400 Bad Request`: The request was malformed or missing required parameters.
- `401 Unauthorized`: The API key provided was invalid or missing.
- `404 Not Found`: The requested resource was not found.
- `500 Internal Server Error`: An unexpected error occurred on the server.

### PRODUCT API

This API is used to manage products, including adding, updating, deleting, and retrieving products.

#### Base URL

The base URL for all API requests is: `localhost:5050/api/product/`

#### Endpoints

- **POST** `/add`: Adds a new product with an image.
- **PUT** `/update`: Updates an existing product, with an optional image update.
- **DELETE** `/delete`: Deletes a single product by ID.
- **DELETE** `/deleteAllProduct`: Deletes all products.
- **GET** `/getProduct`: Retrieves a single product by ID.
- **GET** `/getAllProduct`: Retrieves all products.

#### Parameters for Adding a Product

- `name` (required): Name of the product.
- `price` (required): Price of the product.
- `category` (required): Category of the product.
- `description` (required): Description of the product.
- `image` (required): Product image file, uploaded via `multipart/form-data`.

**Response:** Returns a JSON object with the following properties:

- `success`: Boolean indicating success or failure.
- `message`: Output message.

**Example Request:**

```json
POST /add
Content-Type: multipart/form-data
{
  "name": "Pizza",
  "price": 10.99,
  "category": "Food",
  "description": "Delicious cheese pizza",
  "image": [file upload]
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "Product added"
}
```

**Errors:**

- `500 Internal Server Error`: An unexpected error occurred on the server.

#### Parameters for Updating a Product

- `id` (required): ID of the product (query parameter).
- `name` (required): Name of the product.
- `price` (required): Price of the product.
- `category` (required): Category of the product.
- `description` (required): Description of the product.
- `image` (optional): Product image file, uploaded via `multipart/form-data`.

**Response:** Returns a JSON object with the following properties:

- `success`: Boolean indicating success or failure.
- `message`: Output message.
- `updatedProduct`: The updated product object with fields `Name`, `Price`, `Category`, `Image`, `Description`.

**Example Request:**

```json
PUT /update?id=6812bd7a37a3d12eae5a6b7f
Content-Type: multipart/form-data
{
  "name": "Updated Pizza",
  "price": 12.99,
  "category": "Food",
  "description": "Updated cheese pizza",
  "image": [file upload, optional]
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "Product updated",
  "updatedProduct": {
    "Name": "Updated Pizza",
    "Price": 12.99,
    "Category": "Food",
    "Image": "1623456789pizza.jpg",
    "Description": "Updated cheese pizza",
    "_id": "6812bd7a37a3d12eae5a6b7f"
  }
}
```

**Errors:**

- `404 Not Found`: Product not found.
- `500 Internal Server Error`: An unexpected error occurred on the server.

#### Parameters for Deleting a Product

- `id` (required): ID of the product (query parameter).

**Response:** Returns a JSON object with the following properties:

- `success`: Boolean indicating success or failure.
- `message`: Output message.

**Example Request:**

```
DELETE /delete?id=6812bd7a37a3d12eae5a6b7f
```

**Example Response:**

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

**Errors:**

- `404 Not Found`: Product not found.
- `500 Internal Server Error`: An unexpected error occurred on the server.

#### Parameters for Deleting All Products

No parameters required.

**Response:** Returns a JSON object with the following properties:

- `success`: Boolean indicating success or failure.
- `message`: Output message.

**Example Request:**

```
DELETE /deleteAllProduct
```

**Example Response:**

```json
{
  "success": true,
  "message": "all products are deleted"
}
```

**Errors:**

- `500 Internal Server Error`: An unexpected error occurred on the server.

#### Parameters for Getting a Product

- `id` (required): ID of the product (query parameter).

**Response:** Returns a JSON object with the following properties:

- `success`: Boolean indicating success or failure.
- `message`: Output message.
- `product`: The product object with fields `Name`, `Price`, `Category`, `Image`, `Description`.

**Example Request:**

```
GET /getProduct?id=6812bd7a37a3d12eae5a6b7f
```

**Example Response:**

```json
{
  "success": true,
  "message": "Product found!",
  "product": {
    "Name": "Pizza",
    "Price": 10.99,
    "Category": "Food",
    "Image": "1623456789pizza.jpg",
    "Description": "Delicious cheese pizza",
    "_id": "6812bd7a37a3d12eae5a6b7f"
  }
}
```

**Errors:**

- `400 Bad Request`: Failed to find the product (e.g., missing ID).
- `500 Internal Server Error`: An unexpected error occurred on the server.

#### Parameters for Getting All Products

No parameters required.

**Response:** Returns a JSON object with the following properties:

- `success`: Boolean indicating success or failure.
- `products`: An array of product objects, each with fields `Name`, `Price`, `Category`, `Image`, `Description`.

**Example Request:**

```
GET /getAllProduct
```

**Example Response:**

```json
{
  "success": true,
  "products": [
    {
      "Name": "Pizza",
      "Price": 10.99,
      "Category": "Food",
      "Image": "1623456789pizza.jpg",
      "Description": "Delicious cheese pizza",
      "_id": "6812bd7a37a3d12eae5a6b7f"
    },
    {
      "Name": "Burger",
      "Price": 8.99,
      "Category": "Food",
      "Image": "1623456790burger.jpg",
      "Description": "Juicy beef burger",
      "_id": "6813860d787823c5dc7fda3d"
    }
  ]
}
```

**Errors:**

- `500 Internal Server Error`: An unexpected error occurred on the server.

### FEEDBACK API

This API is used to manage feedback for products, allowing users to leave feedback and retrieve feedback for a specific product.

#### Base URL

The base URL for all API requests is: `localhost:5050/feedback/`

#### Endpoints

- **POST** `/leaveFeedback`: Submits feedback for a product.
- **GET** `/getFeedback`: Retrieves feedback for a specific product.

#### Parameters for Leaving Feedback

- `id` (required): ID of the product (query parameter).
- `Username` (required): Username of the user leaving feedback.
- `Comment` (optional): Feedback comment.
- `Rate` (required): Rating (1-5).
- `Date` (required): Date of the feedback (e.g., "2025-05-17").

**Response:** Returns a JSON object with the following properties:

- `success`: Boolean indicating success or failure.
- `message`: Output message.

**Example Request:**

```json
POST /leaveFeedback?id=6812bd7a37a3d12eae5a6b7f
{
  "Username": "user123",
  "Comment": "Great pizza, loved the crust!",
  "Rate": 5,
  "Date": "2025-05-17"
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "feedback added"
}
```

**Errors:**

- `500 Internal Server Error`: An unexpected error occurred on the server.

#### Parameters for Getting Feedback

- `id` (required): ID of the product (query parameter).

**Response:** Returns a JSON object with the following properties:

- `success`: Boolean indicating success or failure.
- `message`: Output message.
- `feedbacks`: An array of feedback objects, each with fields `UserName`, `ProductId`, `Comment`, `Rate`, `Date`.

**Example Request:**

```
GET /getFeedback?id=6812bd7a37a3d12eae5a6b7f
```

**Example Response:**

```json
{
  "success": true,
  "message": "Feedbacks found",
  "feedbacks": [
    {
      "UserName": "user123",
      "ProductId": "6812bd7a37a3d12eae5a6b7f",
      "Comment": "Great pizza, loved the crust!",
      "Rate": 5,
      "Date": "2025-05-17",
      "_id": "682829434530d565aacaf260"
    },
    {
      "UserName": "user456",
      "ProductId": "6812bd7a37a3d12eae5a6b7f",
      "Comment": "Too salty for my taste.",
      "Rate": 3,
      "Date": "2025-05-16",
      "_id": "682829434530d565aacaf261"
    }
  ]
}
```

**Errors:**

- `404 Not Found`: Product not found (no feedback available).
- `500 Internal Server Error`: An unexpected error occurred on the server.

