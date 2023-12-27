const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema(
  {
    shopName: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    companyName: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    postCode: {
      type: String,
      required: false,
      trim: true,
    },
    companyLogo: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
