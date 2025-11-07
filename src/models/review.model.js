import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200 
    },
    photo: {
      type: String,
      default: "", 
    },
    orderId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: false
    },
    category: {
      type: String,
      required: true,
      default: ""
    }
    
    },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", reviewSchema);
