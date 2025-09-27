import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  name: { type: String, enum:["semanal","mensual"], required: true, unique: true },
  value: { type: Number, default: 0 },
});

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;
