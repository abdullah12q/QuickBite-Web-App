import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    Category: { type: String, required: true },
    Image: { type: String, required: true },
    Description: { type: String, required: true }
})

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
