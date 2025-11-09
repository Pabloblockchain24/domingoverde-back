// models/ShortLink.js
import mongoose from "mongoose";

const shortLinkSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ShortLink", shortLinkSchema);
