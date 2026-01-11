import express from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  updateAvalability,
} from "../controllers/product.controller.js";
import multer from "multer";

const productRoute = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

productRoute.post("/add", upload.single("image"), addProduct);
productRoute.put("/update", upload.single("image"), updateProduct);
productRoute.delete("/delete", deleteProduct);
productRoute.get("/getProduct", getProduct);
productRoute.get("/getAllProducts", getAllProducts);
productRoute.put("/updateAvalability", updateAvalability);

export default productRoute;
