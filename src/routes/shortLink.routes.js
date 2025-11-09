import express from "express";
import { getShortLink } from "../controllers/shortLink.controller.js";

const router = express.Router();

router.get("/shortLink/:code", getShortLink);

export default router;