// routes/purchases.js
import express from "express";
import {
  crearCompra,
  obtenerCompras,
  obtenerCompraPorId,
  actualizarEstadoCompra, // <- importamos el nuevo controller
  eliminarCompra
} from "../controllers/purchase.controller.js";

const router = express.Router();

router.post("/", crearCompra);
router.get("/", obtenerCompras);
router.get("/:id", obtenerCompraPorId);

// Nueva ruta para actualizar estado
router.patch("/:id", actualizarEstadoCompra);
router.delete("/:id", eliminarCompra);

export default router;
