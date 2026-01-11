import express from "express";
import {
  loginUser,
  registerUser,
  getUser,
  updateUserInfo,
  getAllUsers,
  toggleUserAvailability,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getUser", authMiddleware, getUser);
userRouter.put("/updateUserInfo", authMiddleware, updateUserInfo);
userRouter.get("/getAllUsers", getAllUsers);
userRouter.put("/toggleUserAvailability", toggleUserAvailability);

export default userRouter;
