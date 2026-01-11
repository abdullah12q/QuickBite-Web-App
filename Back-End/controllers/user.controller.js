import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

import userModel from "../models/user.model.js";

import UserFactory from "../patterns/UserFactory.js";

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_HASH, { expiresIn: "12h" });
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Email or Password are incorrect!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Email or Password are incorrect!",
      });
    }

    const token = generateToken(user._id);
    if (email == process.env.ADMIN_EMAIL) {
      res.json({ success: true, token, isAdmin: true });
    } else {
      res.json({ success: true, token, id: user._id });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Server error occurred",
    });
  }
}

export async function registerUser(req, res) {
  try {
    const { name, email, password, role, vehicleType, licenseNumber } =
      req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Email already exists!" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email!",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // -----------------------------------------------------------
    // FACTORY PATTERN USAGE
    // -----------------------------------------------------------
    // We pass the role and a combined data object to the factory.
    // The factory handles the logic for 'delivery' specific fields.
    const user = await UserFactory.createUser(role, {
      name,
      email,
      password: hashedPassword,
      vehicleType,
      licenseNumber,
    });

    const token = generateToken(user._id);

    res.json({
      token,
      user,
      id: user._id,
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message || "Server error occurred",
    });
  }
}

export async function getUser(req, res) {
  try {
    const user = await userModel.findById(req.query.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function updateUserInfo(req, res) {
  try {
    const userId = req.query.userId;
    const { name, email } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updates = {};

    if (name) {
      updates.name = name;
    }

    if (email) {
      if (!validator.isEmail(email)) {
        return res.json({
          success: false,
          message: "Please enter a valid email!",
        });
      }

      const exists = await userModel.findOne({ email });
      if (exists && user.email !== email) {
        return res.json({ success: false, message: "Email already exists!" });
      }

      updates.email = email;
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, updates, { new: true })
      .select("-password");

    res.json({
      success: true,
      user: updatedUser,
      message: "User information updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await userModel.find({});
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: "server error" });
  }
}

export async function toggleUserAvailability(req, res) {
  try {
    const { userId } = req.body;
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await userModel.findOneAndUpdate(
      { _id: userId },
      { isAvailable: !user.isAvailable },
      { new: true }
    );
    res.json({ success: true, message: "User Avalability updated" });
  } catch (error) {
    res.json({ success: false, message: "server error" });
  }
}
