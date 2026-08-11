const mongoose = require("mongoose");

const checkLogSchema = new mongoose.Schema(
  {
    visitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
    },
    passId: String,
    visitorName: String,
    gate: {
      type: String,
      default: "Main Gate A",
    },
    guardName: {
      type: String,
      default: "Duty Guard",
    },
    checkInTime: Date,
    checkOutTime: Date,
    status: {
      type: String,
      enum: ["inside", "outside"],
      default: "inside",
    },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CheckLog", checkLogSchema);