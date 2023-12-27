const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
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
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    sku: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    barCode: {
      type: String,
      required: false,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: false,
    },
    tags: [String],
    orderBy: {
      type: Number,
      required: false,
      trim: true,
    },
    images: {
      type: Array,
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
      default: "show",
      enum: ["show", "hide"],
    },
    featured: {
      type: String,
      default: "hide",
      enum: ["show", "hide"],
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
