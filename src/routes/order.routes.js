// routes/orders.js
import express from "express";
import {
  crearOrden,
  obtenerOrdenes,
  obtenerOrdenPorId,
  actualizarEstadoOrden, // <- importamos el nuevo controller
  eliminarOrden,
  generarReviewToken
} from "../controllers/order.controller.js";


const router = express.Router();

router.post("/", crearOrden);
router.get("/", obtenerOrdenes);
router.get("/:id", obtenerOrdenPorId);

// Nueva ruta para actualizar estado
router.patch("/:id", actualizarEstadoOrden);
router.delete("/:id", eliminarOrden);
router.patch("/token/:id", generarReviewToken);

export default router;
