import ShortLink from "../models/shortLink.model.js";

export const getShortLink = async (req, res) => {
  try {
    const { code } = req.params;
    const short = await ShortLink.findOne({ code });
    if (!short) {
      return res.status(404).json({ error: "Short link no encontrado" });
    }

    res.json({ originalUrl: short.originalUrl  });
  } catch (error) {
    console.error("Error al obtener short link:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
