import { error } from "console";
import feedbackModel from "../models/Feedback.js";

const leaveFeedback = async (req, res) => {
  try {
    const productId = req.query.id;
    const feedback = new feedbackModel({
      UserName: req.body.Username,
      ProductId: productId,
      Comment: req.body.Comment,
      Rate: req.body.Rate,
      Date: req.body.Date,
    });
    await feedback.save();
    res.json({ success: true, message: "feedback added" });
  } catch (error) {
    res.json({ success: false, message: "server error", error });
  }
};
const getFeedback = async (req, res) => {
  try {
    const productId = req.query.id;
    const feedbacks = await feedbackModel.find({ ProductId: productId });
    if (!feedbacks)
      return res.json({ success: false, message: "product not found" });
    res.json({ success: true, message: "Feedbacks found", feedbacks });
  } catch (error) {
    res.json({ success: false, message: "server error" });
  }
};

export { leaveFeedback, getFeedback };
