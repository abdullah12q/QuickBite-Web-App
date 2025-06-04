import express from "express"
import { leaveFeedback, getFeedback } from "../controllers/feedbackController.js"

const feedbackRoute = express.Router();


feedbackRoute.post("/leaveFeedback", leaveFeedback)
feedbackRoute.get("/getFeedback", getFeedback)

export default feedbackRoute


