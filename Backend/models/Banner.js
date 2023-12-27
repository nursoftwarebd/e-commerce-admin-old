const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    link: {
      type: String,
      required: false,
      trim: true,
    },
    image: {
      type: Object,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "show",
      enum: ["show", "hide"],
    },
    orderBy: {
      type: Number,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
