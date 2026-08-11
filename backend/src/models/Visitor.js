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
    company: String,
    department: String,
    purpose: String,
    idType: {
      type: String,
      default: "National ID",
    },
    idNumber: String,
    emergencyContact: String,

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hostName: String,

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },

    photo: String,
    qrCode: String,

    status: {
      type: String,
      enum: ["pending", "approved", "inside", "outside", "rejected", "expired"],
      default: "pending",
    },

    checkInTime: Date,
    checkOutTime: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);