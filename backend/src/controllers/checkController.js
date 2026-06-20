const CheckLog = require("../models/CheckLog");
const Visitor = require("../models/Visitor");

// CHECK-IN
exports.checkIn = async (req, res) => {
  try {
    const { visitorId } = req.body;

    const visitor = await Visitor.findById(visitorId);
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    const checkIn = await CheckLog.create({
      visitor: visitorId,
      checkInTime: new Date(),
      status: "inside",
    });

    res.status(201).json({
      message: "Check-in successful",
      checkIn,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHECK-OUT
exports.checkOut = async (req, res) => {
  try {
    const { visitorId } = req.body;

    const log = await CheckLog.findOne({
      visitor: visitorId,
      status: "inside",
    });

    if (!log) {
      return res.status(404).json({ message: "Active check-in not found" });
    }

    log.checkOutTime = new Date();
    log.status = "outside";

    await log.save();

    res.status(200).json({
      message: "Check-out successful",
      log,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};