import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  precio: Number,
  image: String,
  category: String,
  cantidad: {
    type: Number,
    default: 1,
  },
});

const purchaseSchema = new mongoose.Schema(
  {
    nCompra: { type: Number, unique: true, index: true },
    proveedor: { type: String, required: true },
    estadoEntrega: {
      type: String,
      enum: ["pendiente", "recibida", "cancelada"],
      default: "pendiente",
    },
    estadoPago: {
      type: String,
      enum: ["pendiente", "pagado"],
      default: "pendiente",
    },
    productos: [productoSchema],
    metodoPago: { type: String, required: true },
    total: { type: Number, required: true },

  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;
