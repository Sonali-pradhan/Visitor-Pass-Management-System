const mongoose = require("mongoose");

const passSchema = new mongoose.Schema(
  {
    passId: {
      type: String,
      unique: true,
    },
    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
    },
    visitorName: String,
    hostName: String,

    qrCode: String,

    passType: {
      type: String,
      enum: ["Standard", "VIP", "Contractor", "Event", "Pre-Booked"],
      default: "Standard",
    },
    accessGates: {
      type: [String],
      default: ["Main Entrance", "Lobby"],
    },

    validFrom: {
      type: Date,
      default: Date.now,
    },

    validTo: Date,

    status: {
      type: String,
      enum: ["active", "expired", "revoked"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pass", passSchema);