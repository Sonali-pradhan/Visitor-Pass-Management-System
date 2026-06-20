const Visitor = require("../models/Visitor");
const Pass = require("../models/Pass");
const QRCode = require("qrcode");

// CREATE VISITOR
exports.createVisitor = async (req, res) => {
  try {
    const passId = "PASS-" + Date.now();

    const visitor = await Visitor.create({
      ...req.body,
      passId,
    });

    // generate QR
    const qrData = await QRCode.toDataURL(
      JSON.stringify({
        passId: visitor.passId,
        visitorId: visitor._id,
      })
    );

    visitor.qrCode = qrData;
    await visitor.save();

    // create pass
    const pass = await Pass.create({
      visitorId: visitor._id,
      qrCode: visitor.qrCode,
      validTo: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res.status(201).json({
      message: "Visitor + Pass created successfully",
      visitor,
      pass,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHECK-IN
exports.checkIn = async (req, res) => {
  try {
    const { passId } = req.body;

    const visitor = await Visitor.findOne({ passId });

    if (!visitor) {
      return res.status(404).json({ message: "Invalid Pass" });
    }

    visitor.status = "inside";
    visitor.checkInTime = new Date();

    await visitor.save();

    res.json({
      message: "Check-in successful",
      visitor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHECK-OUT
exports.checkOut = async (req, res) => {
  try {
    const { passId } = req.body;

    const visitor = await Visitor.findOne({ passId });

    if (!visitor) {
      return res.status(404).json({ message: "Invalid Pass" });
    }

    visitor.status = "outside";
    visitor.checkOutTime = new Date();

    await visitor.save();

    res.json({
      message: "Check-out successful",
      visitor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL VISITORS
exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().populate("host");

    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};