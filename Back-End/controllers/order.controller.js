import userModel from "../models/user.model.js";
import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";

import {
  PaymentContext,
  CreditCardPayment,
  CashPayment,
} from "../patterns/PaymentStrategy.js";
import orderSubject from "../patterns/OrderObserver.js";

import {
  BaseProduct,
  ExtraCheese,
  SpicySauce,
  MakeItCombo,
} from "../patterns/OrderDecorator.js";

export async function createOrder(req, res) {
  try {
    // Note: 'items' inside req.body should now look like:
    // [{ id: "...", quantity: 1, extras: ["cheese", "combo"] }]
    const { userId, paymentMethod, phoneNumber, address, items } = req.body;

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

    // ---------------------------------------------------------
    // 1. CALCULATE TOTAL (Now with Decorator Pattern!)
    // ---------------------------------------------------------
    for (let item of items) {
      const product = await productModel.findById(item.id);
      if (!product) {
        return res.json({
          success: false,
          message: `Invalid product ID: ${item.id}`,
        });
      }

      // ---------------------------------------------------------
      // 1. DECORATOR PATTERN (for each item)
      // ---------------------------------------------------------
      // A. Create the Base Component using the DB product
      let orderItem = new BaseProduct(product);

      // B. Check for extras in the request and "Wrap" the base product
      // We assume item.extras is an array of strings like ["cheese", "sauce"]
      if (item.extras) {
        const enabledExtras = Object.keys(item.extras).filter(
          (key) => item.extras[key] === true
        );

        enabledExtras.forEach((extraKey) => {
          if (extraKey === "extraCheese") {
            orderItem = new ExtraCheese(orderItem);
          } else if (extraKey === "spicySauce") {
            orderItem = new SpicySauce(orderItem);
          } else if (extraKey === "makeItCombo") {
            orderItem = new MakeItCombo(orderItem);
          }
        });
      }

      // C. Get the FINAL price and description from the wrapped object
      const finalUnitPrice = orderItem.getCost();
      const finalDescription = orderItem.getDescription();

      const itemTotal = finalUnitPrice * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: product._id,
        name: finalDescription, // Saving the decorated name (e.g., "Burger + Cheese")
        quantity: item.quantity,
        description: item.description,
        image: item.image,
        price: finalUnitPrice,
        total: itemTotal,
      });
    }

    totalAmount += fixedDeliveryFees;

    // ---------------------------------------------------------
    // 2. STRATEGY PATTERN (Payment Processing)
    // ---------------------------------------------------------
    let paymentContext;
    let paymentStatus;

    if (paymentMethod === "Cash on Delivery") {
      paymentContext = new PaymentContext(new CashPayment());
    } else {
      paymentContext = new PaymentContext(new CreditCardPayment());
    }

    paymentStatus = paymentContext.executePayment(totalAmount);

    const newOrder = new orderModel({
      userId,
      items: orderItems,
      amount: totalAmount,
      address: orderAddress,
      paymentMethod,
      paymentStatus,
      phoneNumber,
    });

    await newOrder.save();

    // ---------------------------------------------------------
    // 3. OBSERVER PATTERN (Notification)
    // ---------------------------------------------------------
    orderSubject.notify(newOrder);

    return res.status(201).json({
      success: true,
      message: "Order created successfully!",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.json({ success: false, message: "Internal server error." });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { orderId, status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    orderSubject.notify(order);

    res.json({ success: true, message: "Order status updated!", order });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error updating status" });
  }
}

export async function getUserOrders(req, res) {
  try {
    const userOrders = await orderModel
      .find({ userId: req.query.userId })
      .sort({ createdAt: -1 });

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
}

export async function getOrders(req, res) {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    if (!orders) {
      return res.json({ success: false, message: "Couldn't find orders" });
    }
    return res.status(201).json({ success: true, orders });
  } catch (err) {
    return res.json({ success: false, message: "Couldn't fetch orders." });
  }
}
