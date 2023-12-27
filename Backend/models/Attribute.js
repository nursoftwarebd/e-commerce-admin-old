const mongoose = require("mongoose");

const attributeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    options: {
      type: String,
      default: "dropdown",
      enum: ["dropdown", "radio", "checkbox"],
    },
    variants: [
      {
        name: {
          type: String,
          required: false,
          lowercase: true,
        },
        status: {
          type: String,
          default: "show",
          enum: ["show", "hide"],
        },
      },
    ],
    status: {
      type: String,
      default: "show",
      enum: ["show", "hide"],
    },
  },
  { timestamps: true }
);

const Attribute = mongoose.model("Attribute", attributeSchema);

module.exports = Attribute;
