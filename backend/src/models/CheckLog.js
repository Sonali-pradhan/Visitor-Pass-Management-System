const mongoose = require("mongoose");

const checkLogSchema = new mongoose.Schema({
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
  },
  checkInTime: Date,
  checkOutTime: Date,
  status: {
    type: String,
    enum: ["inside", "outside"],
    default: "inside",
  },
});

module.exports = mongoose.model("CheckLog", checkLogSchema);