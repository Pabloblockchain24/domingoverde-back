// models/campaign.js
import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    nombre: String,
    tipo: {
      type: String,
      enum: [
        "Concurso",
        "Google Ads",
        "Amigos",
        "WhatsApp",
        "Visita Local",
        "Marketplace",
      ],
      required: true,
    },
    inicio: Date,
    fin: Date,
    inversion: Number,
    alcance: Number,
    leads: Number,
    conversiones: Number,
    retorno: Number,
    estado: {
      type: String,
      enum: ["Activa", "Finalizada", "Pausada"],
      default: "Activa",
    },
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign;
