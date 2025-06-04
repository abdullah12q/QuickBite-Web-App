// app conifg
const app = express();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/DB.js";
import "dotenv/config.js";

//Routes
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRoute.js";
import feedbackRouter from "./routes/feedbackRoute.js";

//app init
app.use(express.json());
app.use(cors());

//connect the database
connectDB();

//api endpoints
app.use("/auth", userRouter);
app.use("/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/feedback", feedbackRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});

app.listen(process.env.PORT, () => {
  console.log(`Started listening on port ${process.env.PORT}....`);
});
