// controllers/purchaseController.js
import Purchase from "../models/purchase.model.js";

// Crear una compra
export const crearCompra = async (req, res) => {
  try {
    const { proveedor, fecha, productos, metodoPago, total } = req.body;

    // Buscar la última compra para calcular el próximo número correlativo
    const ultimaCompra = await Purchase.findOne().sort({ nCompra: -1 });
    const nuevoNumeroCompra = ultimaCompra ? ultimaCompra.nCompra + 1 : 1;

    const nuevaCompra = new Purchase({
      nCompra: nuevoNumeroCompra,
      proveedor,
      fecha,
      productos,
      total,
      metodoPago,
      estadoEntrega: "pendiente",
      estadoPago: "pendiente",
    });

    const compraGuardada = await nuevaCompra.save();
    res.status(201).json(compraGuardada);
  } catch (error) {
    console.error("Error al crear la compra:", error);
    res.status(500).json({ error: "Error al crear la compra" });
  }
};

// Obtener todas las compras
export const obtenerCompras = async (req, res) => {
  try {
    const compras = await Purchase.find().sort({ createdAt: -1 });
    res.json(compras);
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    res.status(500).json({ error: "Error al obtener las compras" });
  }
};

// Obtener compra por ID
export const obtenerCompraPorId = async (req, res) => {
  try {
    const compra = await Purchase.findById(req.params.id);
    if (!compra) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }
    res.json(compra);
  } catch (error) {
    console.error("Error al buscar la compra:", error);
    res.status(500).json({ error: "Error al buscar la compra" });
  }
};

// Actualizar estado de la compra
export const actualizarEstadoCompra = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.estadoEntrega) {
      const estadosValidos = ["pendiente", "recibida", "cancelada"];
      if (!estadosValidos.includes(req.body.estadoEntrega)) {
        return res.status(400).json({ error: "Estado de entrega no válido" });
      }
    }

    if (req.body.estadoPago) {
      const estadosPagoValidos = ["pendiente", "pagado"];
      if (!estadosPagoValidos.includes(req.body.estadoPago)) {
        return res.status(400).json({ error: "Estado de pago no válido" });
      }
    }

    const compraActualizada = await Purchase.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!compraActualizada) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }

    res.json(compraActualizada);
  } catch (error) {
    console.error("Error al actualizar la compra:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar compra
export const eliminarCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const compraEliminada = await Purchase.findByIdAndDelete(id);
    if (!compraEliminada) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }
    res.json({ message: "Compra eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la compra:", error);
    res.status(500).json({ error: "Error al eliminar la compra" });
  }
};
