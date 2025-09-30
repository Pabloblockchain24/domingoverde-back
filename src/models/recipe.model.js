import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    ingredients: {
      type: [String],
      required: [true, "Los ingredientes son obligatorios"],
    },
    steps: {
      type: [String],
      required: [true, "Los pasos son obligatorios"],
    },
    image: {
      type: String, // URL de la imagen
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
