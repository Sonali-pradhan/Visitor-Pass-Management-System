const Visitor = require("../models/Visitor");
const Pass = require("../models/Pass");
const CheckLog = require("../models/CheckLog");
const QRCode = require("qrcode");

// CREATE VISITOR
exports.createVisitor = async (req, res) => {
  try {
    const passId = "VP-" + Math.floor(100000 + Math.random() * 900000);

    const initialStatus = req.body.status || "approved";

    const visitor = await Visitor.create({
      ...req.body,
      passId,
      status: initialStatus,
    });

    // generate QR code string
    const qrData = await QRCode.toDataURL(
      JSON.stringify({
        passId: visitor.passId,
        visitorId: visitor._id,
        name: visitor.name,
      })
    );

    visitor.qrCode = qrData;
    await visitor.save();

    // create pass entry
    const pass = await Pass.create({
      passId: visitor.passId,
      visitorId: visitor._id,
      visitorName: visitor.name,
      hostName: visitor.hostName || "N/A",
      qrCode: visitor.qrCode,
      passType: req.body.passType || "Standard",
      validFrom: new Date(),
      validTo: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: "active",
    });

    res.status(201).json({
      message: "Visitor & Pass generated successfully",
      visitor,
      pass,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL VISITORS (WITH FILTERS)
exports.getVisitors = async (req, res) => {
  try {
    const { status, host, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (host) query.host = host;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { passId: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const visitors = await Visitor.find(query).populate("host").sort({ createdAt: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE VISITOR BY ID OR PASS ID
exports.getVisitorById = async (req, res) => {
  try {
    const { id } = req.params;
    let visitor = await Visitor.findById(id).populate("host");
    if (!visitor) {
      visitor = await Visitor.findOne({ passId: id }).populate("host");
    }
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE VISITOR STATUS (e.g. approve/reject)
exports.updateVisitorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const visitor = await Visitor.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    res.json({
      message: `Visitor status updated to ${status}`,
      visitor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE VISITOR
exports.deleteVisitor = async (req, res) => {
  try {
    const { id } = req.params;
    await Visitor.findByIdAndDelete(id);
    await Pass.deleteMany({ visitorId: id });
    res.json({ message: "Visitor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHECK-IN VISITOR
exports.checkIn = async (req, res) => {
  try {
    const { passId } = req.body;

    const visitor = await Visitor.findOne({ passId });

    if (!visitor) {
      return res.status(404).json({ message: "Invalid Pass ID" });
    }

    if (visitor.status === "rejected") {
      return res.status(400).json({ message: "This visitor request was rejected." });
    }

    visitor.status = "inside";
    visitor.checkInTime = new Date();
    await visitor.save();

    // Create CheckLog
    await CheckLog.create({
      visitor: visitor._id,
      passId: visitor.passId,
      visitorName: visitor.name,
      checkInTime: visitor.checkInTime,
      status: "inside",
    });

    res.json({
      message: `${visitor.name} checked in successfully`,
      visitor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHECK-OUT VISITOR
exports.checkOut = async (req, res) => {
  try {
    const { passId } = req.body;

    const visitor = await Visitor.findOne({ passId });

    if (!visitor) {
      return res.status(404).json({ message: "Invalid Pass ID" });
    }

    visitor.status = "outside";
    visitor.checkOutTime = new Date();
    await visitor.save();

    // Update active CheckLog
    const log = await CheckLog.findOne({
      passId,
      status: "inside",
    }).sort({ createdAt: -1 });

    if (log) {
      log.checkOutTime = visitor.checkOutTime;
      log.status = "outside";
      await log.save();
    }

    res.json({
      message: `${visitor.name} checked out successfully`,
      visitor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};