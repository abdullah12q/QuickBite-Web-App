import express from "express";
import {
  loginUser,
  registerUser,
  getUser,
  updateUserInfo,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getUser", authMiddleware, getUser);
userRouter.put("/updateUserInfo", authMiddleware, updateUserInfo);
export default userRouter;
