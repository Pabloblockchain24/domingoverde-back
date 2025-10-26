// controllers/orderController.js
import Order from "../models/order.model.js";
import Counter from "../models/counter.model.js";
import config from "../config/config.js";
import Brevo from "@getbrevo/brevo";
import crypto from "crypto";

export const crearOrden = async (req, res) => {
  try {
    // 🔹 Obtener el número de venta incremental
    const counter = await Counter.findOneAndUpdate(
      { name: "ventas" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    const nuevaOrden = new Order({
      nVenta: counter.value,
      ...req.body,
      estadoEntrega: "pendiente",
      estadoPago: "pendiente",
    });

    const ordenGuardada = await nuevaOrden.save();
    console.log("Orden guardada:", ordenGuardada);
    console.log("BREVO_API_KEY", config.BREVO_API_KEY);

    // 🔹 Solo enviar correo si la venta es desde la página
    if (ordenGuardada.ventaPagina) {
      // Configurar cliente Brevo
      const apiInstance = new Brevo.TransactionalEmailsApi();
      apiInstance.setApiKey(
        Brevo.TransactionalEmailsApiApiKeys.apiKey,
        config.BREVO_API_KEY
      );
      // Construir HTML del correo
      const productosHTML = ordenGuardada.productos
        .map(
          (p) => `
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px;">${p.nombre}</td>
            <td style="text-align:center; padding: 8px;">${p.cantidad}</td>
            <td style="text-align:right; padding: 8px;">$${p.precio}</td>
            <td style="text-align:right; padding: 8px;">$${
              p.cantidad * p.precio
            }</td>
          </tr>
        `
        )
        .join("");

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #008f39; text-align: center;">🌿 Nueva venta en Domingo Verde</h2>
          <div style="margin-bottom: 20px;">
            <p><strong>Nombre:</strong> ${ordenGuardada.nombre} ${ordenGuardada.apellido}</p>
            <p><strong>Celular:</strong> ${ordenGuardada.celular}</p>
            <p><strong>Dirección:</strong> ${ordenGuardada.direccion}</p>
            <p><strong>Hora entrega:</strong> ${ordenGuardada.horaEntrega}</p>
            <p><strong>Método de pago:</strong> ${ordenGuardada.metodoPago}</p>
            <p><strong>Total:</strong> <span style="color:#008f39; font-weight: 600;">$${ordenGuardada.total}</span></p>
          </div>
          <h3 style="border-bottom: 2px solid #008f39; padding-bottom: 5px;">Productos</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #e0f2e9;">
                <th style="text-align:left; padding: 8px;">Producto</th>
                <th style="text-align:center; padding: 8px;">Cantidad</th>
                <th style="text-align:right; padding: 8px;">Precio</th>
                <th style="text-align:right; padding: 8px;">Total</th>
              </tr>
            </thead>
            <tbody>${productosHTML}</tbody>
          </table>
          <p style="margin-top: 20px; font-size: 0.9rem; color: #555;">Este correo es automático, generado por Domingo Verde 🌿.</p>
        </div>
      `;

      // Enviar correo
      const sendSmtpEmail = {
        to: [{ email: config.BREVO_DESTINO, name: "Ventas Domingo Verde" }],
        sender: {
          email: config.BREVO_SENDER,
          name: "Domingo Verde 🌿 | Notificaciones",
        },
        subject: `Nueva orden #${ordenGuardada.nVenta}`,
        htmlContent,
      };

      await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log("✅ Correo enviado exitosamente con Brevo");
    }

    res.status(201).json(ordenGuardada);
  } catch (error) {
    console.error("❌ Error al crear la orden:", error);
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

    const ordenActualizada = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

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

export const generarReviewToken = async (req, res) => {

  try {
    const { id } = req.params;
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    const ordenActualizada = await Order.findByIdAndUpdate(
      id,
      { reviewToken: token, reviewTokenExpires: expiresAt },
      { new: true }
    );

    if (!ordenActualizada) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    const reviewLink = `domingoverde.cl/review?token=${token}`;

    res.json({
      message: "Token de reseña generado correctamente",
      reviewToken: token,
      reviewLink,
    });
  } catch (error) {
    console.error("Error al generar el token de review:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};