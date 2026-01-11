import express from "express";
import {
  leaveFeedback,
  getFeedback,
} from "../controllers/feedback.controller.js";
import multer from "multer";

const feedbackRoute = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

feedbackRoute.post("/leaveFeedback", upload.single("image"), leaveFeedback);
feedbackRoute.get("/getFeedback", getFeedback);

export default feedbackRoute;
