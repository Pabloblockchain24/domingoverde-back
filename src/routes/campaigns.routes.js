// routes/campaigns.js
import express from "express";

import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign, // <- importamos el nuevo controller
  deleteCampaign
} from "../controllers/campaign.controller.js";

const router = express.Router();

router.post("/", createCampaign);
router.get("/", getCampaigns);
router.get("/:id", getCampaignById);

// Nueva ruta para actualizar estado
router.patch("/:id", updateCampaign);
router.delete("/:id", deleteCampaign);

export default router;
