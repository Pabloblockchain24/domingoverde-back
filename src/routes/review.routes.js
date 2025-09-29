import express from "express";

import {
  getReviews,
  createReview,
  deleteReview
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", createReview);
router.delete("/:id", deleteReview) 