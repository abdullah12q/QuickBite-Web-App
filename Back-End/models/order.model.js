import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const orderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
