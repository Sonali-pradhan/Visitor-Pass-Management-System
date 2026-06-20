const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    passId: {
      type: String,
      unique: true,
    },

    name: String,
    email: String,
    phone: String,
    purpose: String,

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    photo: String,

    qrCode: String,

    status: {
      type: String,
      enum: ["pending", "inside", "outside", "rejected"],
      default: "pending",
    },

    checkInTime: Date,
    checkOutTime: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);