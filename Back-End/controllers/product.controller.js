import fs from "fs";

import productModel from "../models/product.model.js";

export async function addProduct(req, res) {
  try {
    const imageName = req.file ? req.file.filename : null;

    const product = new productModel({
      Name: req.body.name,
      Price: parseFloat(req.body.price),
      Category: req.body.category,
      Image: imageName,
      Description: req.body.description,
    });
    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to add the product" });
  }
}

export async function updateProduct(req, res) {
  try {
    const productId = req.query.id;
    if (!productId)
      return res.json({
        success: false,
        message: "Failed to find the product",
      });

    const product = await productModel.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedData = {
      Name: req.body.name,
      Price: req.body.price,
      Category: req.body.category,
      Description: req.body.description,
    };

    // Only update the image if a new file is uploaded
    if (req.file) {
      updatedData.Image = req.file.filename;
    } else {
      updatedData.Image = product.Image; // Retain the existing image
    }

    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: productId },
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product updated", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
}

export async function deleteProduct(req, res) {
  try {
    const ProductId = req.query.id;
    const product = await productModel.findOne({ _id: ProductId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    fs.unlink(`uploads/${product.Image}`, () => {});
    await productModel.findOneAndDelete({ _id: ProductId });

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getProduct(req, res) {
  try {
    const productId = req.query.id;
    const product = await productModel.findOne({ _id: productId });
    if (!productId)
      return res.json({
        success: false,
        message: "Failed to find the product",
      });
    res.json({ success: true, message: "Product found!", product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "server error" });
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: "server error" });
  }
}

export async function updateAvalability(req, res) {
  try {
    const productId = req.query.id;
    const product = await productModel.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await productModel.findOneAndUpdate(
      { _id: productId },
      { Avalability: !product.Avalability },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Product Avalability updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating Avalability" });
  }
}
