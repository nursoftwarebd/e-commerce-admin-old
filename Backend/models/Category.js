const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    image: {
      type: Object,
      required: false,
      trim: true,
    },
    orderBy: {
      type: Number,
      required: false,
      trim: true,
    },
    bestSelling: {
      type: Number,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      lowercase: true,
      enum: ["show", "hide"],
      default: "show",
    },
    parentId: {
      type: String,
      required: false,
      trim: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
