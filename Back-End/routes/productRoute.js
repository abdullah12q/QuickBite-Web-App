import express from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
  deleteAllProduct,
} from "../controllers/productController.js";
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
productRoute.delete("/deleteAllProduct", deleteAllProduct);
productRoute.get("/getProduct", getProduct);
productRoute.get("/getAllProduct", getAllProduct);

export default productRoute;
