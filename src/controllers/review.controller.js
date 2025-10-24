import Review from "../models/review.model.js";
import Order from "../models/order.model.js";
import cloudinary from "../config/cloudinary.js";

// Obtener todos los reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // más recientes primero
    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los comentarios", error });
  }
};

// Crear un review
export const createReview = async (req, res) => {
  try {
    const { name, rating, comment, orderId } = req.body;

    if (!name || !rating || !comment) {
      return res
        .status(400)
        .json({ message: "Nombre, puntuación y comentario son requeridos" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    if (order.orderReview) {
      return res.status(400).json({
        message: "Esta orden ya tiene una reseña registrada",
      });
    }

    let photoUrl = null;
    if (req.file) {
      const buffer = req.file.buffer;

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "reviews" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(buffer);
      });

      photoUrl = result.secure_url;
    }

    const newReview = new Review({
      name,
      rating,
      comment,
      photo: photoUrl,
      date: new Date(),
      orderId,
    });

    const savedReview = await newReview.save();
    order.orderReview = true;
    order.reviewToken = null;
    await order.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.log("error", error);
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


// Esto responde a domingoverde.cl/review/:token
export const getReviewByToken = async (req, res) => {
  try {
    const { token } = req.params;

    // Buscar orden con ese token
    const order = await Order.findOne({ reviewToken: token });

    if (!order) {
      return res.status(404).json({ message: "Token inválido o no encontrado" });
    }

    // Verificar si el token expiró
    if (order.reviewTokenExpires && order.reviewTokenExpires < Date.now()) {
      return res.status(400).json({ message: "El token ha expirado" });
    }

    // Preparar datos del cliente y productos
    const productosNombres = order.productos.map((p) => p.nombre);
    const firstLetterApellido = order.apellido
      ? order.apellido.charAt(0).toUpperCase()
      : "";
    const nombreCompleto = `${order.nombre} ${firstLetterApellido}.`;

    res.json({
      valid: true,
      nombre: nombreCompleto,
      productos: productosNombres,
      orderId: order._id,
    });
  } catch (err) {
    console.error("Error al obtener la orden por token:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
