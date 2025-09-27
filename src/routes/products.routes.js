// routes/products.js
import express from "express";
import { obtenerProductos, crearProductosBulk, obtenerDestacados } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", obtenerProductos);
router.get("/destacados", obtenerDestacados);
router.post("/bulk", crearProductosBulk);

export default router;
