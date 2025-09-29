import Review from "../models/review.model"

// Obtener todos los reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // más recientes primero
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los comentarios", error });
  }
};

// Crear un review
export const createReview = async (req, res) => {
  try {
    const { name, rating, comment, photo } = req.body;

    if (!name || !rating || !comment) {
      return res
        .status(400)
        .json({ message: "Nombre, puntuación y comentario son requeridos" });
    }

    const newReview = new Review({
      name,
      rating,
      comment,
      photo,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el comentario", error });
  }
};

// Eliminar un review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el comentario", error });
  }
};
