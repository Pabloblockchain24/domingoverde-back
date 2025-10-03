// controllers/orderController.js
import Order from "../models/order.model.js";
import Counter from "../models/counter.model.js";

// controllers/orderController.js

export const crearOrden = async (req, res) => {
      try {
    // Obtener el próximo número atómicamente
    const counter = await Counter.findOneAndUpdate(
      { name: "ventas" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    const nuevaOrden = new Order({
      nVenta: counter.value, // siempre será único
      ...req.body,
      estadoEntrega: "pendiente",
      estadoPago: "pendiente"
    });
    const ordenGuardada = await nuevaOrden.save();
    res.status(201).json(ordenGuardada);
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ error: "Error al crear la orden" });
  }
};
export const obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await Order.find().sort({ createdAt: -1 });
    res.json(ordenes);
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    res.status(500).json({ error: "Error al obtener las órdenes" });
  }
};

export const obtenerOrdenPorId = async (req, res) => {
  try {
    const orden = await Order.findById(req.params.id);
    if (!orden) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }
    res.json(orden);
  } catch (error) {
    console.error("Error al buscar la orden:", error);
    res.status(500).json({ error: "Error al buscar la orden" });
  }
};

export const actualizarEstadoOrden = async (req, res) => {
  try {
    const { id } = req.params;

    // validación solo si viene estado en el body
    if (req.body.estadoEntrega) {
      const estadosValidos = ["pendiente", "fallida", "entregado"];
      if (!estadosValidos.includes(req.body.estadoEntrega)) {
        return res.status(400).json({ error: "Estado no válido" });
      }
    }

    if (req.body.estadoPago) {
      const estadosPagoValidos = ["pendiente", "pagado"];
      if (!estadosPagoValidos.includes(req.body.estadoPago)) {
        return res.status(400).json({ error: "Estado de pago no válido" });
      }
    }

    const ordenActualizada = await Order.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );


    if (!ordenActualizada) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    res.json(ordenActualizada);
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const ordenEliminada = await Order.findByIdAndDelete(id);
    if (!ordenEliminada) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }
    res.json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    res.status(500).json({ error: "Error al eliminar la orden" });
  }
};