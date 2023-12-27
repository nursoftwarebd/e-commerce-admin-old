const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Object,
      required: false,
      trim: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    shippingAddress: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      default: "show",
      enum: ["show", "hide"],
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
