import express from "express";
import { upload } from "../middlewares/upload.middleware.js";

import {
  getReviews,
  createReview,
  deleteReview,
  getReviewByToken
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", upload.single("photo"), createReview);
router.delete("/:id", deleteReview) 


router.get("/:token", getReviewByToken)
export default router;
