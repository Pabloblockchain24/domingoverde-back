// controllers/productController.js
import Product from "../models/product.model.js";

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const obtenerDestacados = async (req, res) => {
  try {
    const destacados = await Product.find({ destacado: true });
    res.json(destacados);
  } catch (error) {
    console.error("Error al obtener productos destacados:", error);
    res.status(500).json({ error: "Error al obtener productos destacados" });
  }
};

export const crearProductosBulk = async (req, res) => {
  try {
    const productos = req.body;

    if (!Array.isArray(productos)) {
      return res.status(400).json({ error: "El cuerpo debe ser un arreglo de productos." });
    }

    const productosCreados = await Product.insertMany(productos);
    res.status(201).json(productosCreados);
  } catch (error) {
    console.error("Error al crear productos:", error);
    res.status(500).json({ error: "Error al crear los productos" });
  }
};