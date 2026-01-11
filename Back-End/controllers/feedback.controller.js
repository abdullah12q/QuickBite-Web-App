import feedbackModel from "../models/feedback.model.js";

export async function leaveFeedback(req, res) {
  try {
    const productId = req.query.id;
    const imageName = req.file ? req.file.filename : null;
    const feedback = new feedbackModel({
      UserName: req.body.Username,
      ProductId: productId,
      Comment: req.body.Comment,
      Rate: req.body.Rate,
      Image: imageName,
      Date: req.body.Date,
    });
    await feedback.save();
    res.json({ success: true, message: "Feedback Added Successfully!" });
  } catch (error) {
    res.json({ success: false, message: "server error", error });
  }
}

export async function getFeedback(req, res) {
  try {
    const productId = req.query.id;
    const feedbacks = await feedbackModel.find({ ProductId: productId });
    if (!feedbacks)
      return res.json({ success: false, message: "product not found" });
    res.json({ success: true, message: "Feedbacks found", feedbacks });
  } catch (error) {
    res.json({ success: false, message: "server error" });
  }
}
