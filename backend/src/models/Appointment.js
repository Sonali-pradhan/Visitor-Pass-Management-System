const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    visitorName: {
      type: String,
      required: true,
    },
    visitorEmail: {
      type: String,
      required: true,
    },
    visitorPhone: String,
    company: String,
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hostName: String,
    department: String,
    date: {
      type: Date,
      required: true,
    },
    timeSlot: String,
    purpose: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
