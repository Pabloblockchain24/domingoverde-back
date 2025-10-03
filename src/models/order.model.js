import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  precio: Number,
  image: String,
  category: String,
  cantidad: {
    type: Number,
    default: 1
  },
  inventoryItem: String,
  inventoryQuantity: Number
});

const orderSchema = new mongoose.Schema(
  {
    nVenta: { type: Number, unique: true, index: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    celular: { type: String, required: true },
    direccion: { type: String, required: true },
    horaEntrega: { type: String, required: true },
    metodoPago: {
      type: String,
      enum: ["efectivo", "transferencia", "tarjeta"],
      required: true,
    },

    productos: [productoSchema],

    total: { type: Number, required: true },

    estadoEntrega: {
      type: String,
      enum: ["pendiente", "fallida", "entregado"],
      default: "pendiente",
    },
    estadoPago: {
      type: String,
      enum: ["pendiente", "pagado"],
      default: "pendiente",
    },
    fechaVenta: {
      type: String,
      default: () => new Date().toLocaleDateString("es-CL"), 
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
