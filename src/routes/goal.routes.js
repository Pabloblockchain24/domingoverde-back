// routes/orders.js
import express from "express";
import {
  obtenerGoals,  
  editGoals,
} from "../controllers/goal.controller.js";

const router = express.Router();

router.get("/", obtenerGoals);
router.put("/", editGoals);

export default router;
