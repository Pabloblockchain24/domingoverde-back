// controllers/campaignController.js
import Campaign from "../models/campaign.model.js";

// Crear campaña
export const createCampaign = async (req, res) => {
  try {
    const {
      nombre,
      tipo,
      inicio,
      fin,
      inversion,
      alcance,
      leads,
      conversiones,
      retorno,
    } = req.body;

    const newCampaign = new Campaign({
      nombre,
      tipo,
      inicio,
      fin,
      inversion,
      alcance,
      leads,
      conversiones,
      retorno,
    });

    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    console.error("Error al crear la campaign:", error);
    res.status(500).json({ error: "Error al crear la campaign" });
  }
};

// Obtener todas las campañas
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    console.error("Error al obtener las campaigns:", error);
    res.status(500).json({ error: "Error al obtener las campaigns" });
  }
};

// Obtener campaña por ID
export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign no encontrada" });
    }
    res.json(campaign);
  } catch (error) {
    console.error("Error al buscar la campaign:", error);
    res.status(500).json({ error: "Error al buscar la campaign" });
  }
};


// Actualizar cualquier campo de la campaña (PATCH)
export const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validar estado solo si viene en el body
    if (updateData.estado) {
      const estadosValidos = ["Activa", "Finalizada", "Pausada"];
      if (!estadosValidos.includes(updateData.estado)) {
        return res.status(400).json({ error: "Estado no válido" });
      }
    }

    const campaign = await Campaign.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!campaign) {
      return res.status(404).json({ error: "Campaign no encontrada" });
    }

    res.json(campaign);
  } catch (error) {
    console.error("Error al actualizar la campaign:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


// Eliminar campaña
export const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCampaign = await Campaign.findByIdAndDelete(id);
    if (!deleteCampaign) {
      return res.status(404).json({ error: "Campaign no encontrada" });
    }
    res.json({ message: "Campaign eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la campaign:", error);
    res.status(500).json({ error: "Error al eliminar la campaign" });
  }
};



