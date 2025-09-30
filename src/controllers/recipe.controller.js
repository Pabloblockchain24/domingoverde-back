import Recipe from "../models/recipe.model.js";

// Obtener todas las recetas
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las recetas", error });
  }
};

// Obtener receta por ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la receta", error });
  }
};

// Crear nueva receta
export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, image } = req.body;

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      image,
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la receta", error });
  }
};

// Actualizar receta
export const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // devuelve la receta ya actualizada
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la receta", error });
  }
};

// Eliminar receta
export const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    res.json({ message: "Receta eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la receta", error });
  }
};
