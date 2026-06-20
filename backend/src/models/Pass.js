const mongoose = require("mongoose");

const passSchema = new mongoose.Schema(
  {
    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
    },

    qrCode: String,

    validFrom: {
      type: Date,
      default: Date.now,
    },

    validTo: Date,

    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pass", passSchema);