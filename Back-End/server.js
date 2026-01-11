import express from "express";
import cors from "cors";
import Database from "./config/DB.js";
import "dotenv/config.js";

import userRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";
import productRouter from "./routes/product.route.js";
import feedbackRouter from "./routes/feedback.route.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

Database.getInstance();

app.use("/auth", userRouter);
app.use("/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/feedback", feedbackRouter);
app.use("/images", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Started listening on port ${PORT}....`);
});
