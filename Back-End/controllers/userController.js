import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//GENERATE TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_HASH, { expiresIn: "12h" });
};

//////////////////////////////////////////////////////////////
//LOGIN USER
//////////////////////////////////////////////////////////////

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
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

    //For Admin authentication only
    if (email == process.env.ADMIN_EMAIL) {
      const token = generateToken(user._id);
      res.json({ success: true, token, isAdmin: true });
    } else {
      const token = generateToken(user._id);
      res.json({ success: true, token, id: user._id });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message || "Server error occurred",
    });
  }
};

//////////////////////////////////////////////////////////////
//REGISTER USER
//////////////////////////////////////////////////////////////
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
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

    //validate email and strong password
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

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = generateToken(user._id);
    res.json({
      token,
      user,
      id: user._id,
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message || "Server error occurred",
    });
  }
};

//////////////////////////////////////////////////////////////
//getting user
//////////////////////////////////////////////////////////////

const getUser = async (req, res) => {
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
};

//////////////////////////////////////////////////////////////
//update user info
//////////////////////////////////////////////////////////////

const updateUserInfo = async (req, res) => {
  const userId = req.query.userId;
  const { name, email } = req.body;
  try {
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
};

export { loginUser, registerUser, getUser, updateUserInfo };
