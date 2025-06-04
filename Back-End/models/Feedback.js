import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    UserName: { type: String, required: true },
    ProductId: { type: String, required: true },
    Comment: { type: String },
    Rate: { type: Number, required: true },
    Date: { type: String, required: true }
})

const feedbackModel = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default feedbackModel;
