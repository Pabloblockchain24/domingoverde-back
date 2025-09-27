import Goal from "../models/goal.model.js";

export const obtenerGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ error: "Error fetching goals" });
  }
};

export const editGoals = async (req, res) => {
  try {
    const metas = req.body; // espera un array: [{name, value}, ...]

    if (!Array.isArray(metas) || metas.length === 0) {
      return res.status(400).json({ error: "Debe enviar un array de metas" });
    }

    // validar cada meta
    for (const meta of metas) {
      if (typeof meta.value !== "number" || meta.value < 0) {
        return res.status(400).json({ error: `Valor inválido para ${meta.name}` });
      }
      if (!["semanal", "mensual"].includes(meta.name)) {
        return res.status(400).json({ error: `Tipo de meta inválido: ${meta.name}` });
      }
    }

    // actualizar todas en paralelo
    const updates = await Promise.all(
      metas.map((meta) =>
        Goal.findOneAndUpdate({ name: meta.name }, { value: meta.value }, { new: true })
      )
    );

    res.json(updates);
  } catch (error) {
    console.error("Error updating goals:", error);
    res.status(500).json({ error: "Error actualizando metas" });
  }
};