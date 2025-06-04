import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: Object, required: true }, // Format: { productId: quantity }
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, default: "placed" },
  createdAt: { type: Date, default: Date.now },
});

const orderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
