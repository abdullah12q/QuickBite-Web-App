import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, paymentMethod, address, items } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }

    const orderAddress = address;
    if (!orderAddress) {
      return res.json({
        success: false,
        message: "User has no address saved!",
      });
    }

    let totalAmount = 0;
    const orderItems = [];
    const fixedDeliveryFees = 50;

    for (let item of items) {
      console.log("item", item);
      const product = await productModel.findById(item.id);
      if (!product) {
        return res.json({
          success: false,
          message: `Invalid product ID: ${item.productId}`,
        });
      }

      const price = product.Price;
      if (isNaN(price)) {
        return res.json({
          success: false,
          message: `Invalid product price for: ${item.productId}`,
        });
      }

      //Price Calculations
      const itemTotal = price * item.quantity;
      totalAmount += itemTotal;

      // Add the item to the order
      orderItems.push({
        productId: product._id,
        ...item,
        total: itemTotal,
      });
    }

    totalAmount += fixedDeliveryFees;

    // Create the order
    const newOrder = new orderModel({
      userId,
      paymentMethod,
      address: orderAddress,
      items: orderItems,
      amount: totalAmount,
    });

    console.log("new order:", newOrder);

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.json({ success: false, message: "Internal server error." });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userOrders = await orderModel.find({ userId: req.query.userId });

    if (!userOrders) {
      return res.json({
        success: false,
        message: "Couldn't find orders for user",
      });
    }

    return res.status(201).json({
      success: true,
      userOrders,
    });
  } catch (err) {
    return res.json({ success: false, message: "Couldn't fetch user orders." });
  }
};
