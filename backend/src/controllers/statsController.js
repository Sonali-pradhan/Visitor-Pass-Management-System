const Visitor = require("../models/Visitor");
const Pass = require("../models/Pass");
const Appointment = require("../models/Appointment");
const CheckLog = require("../models/CheckLog");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    const insideCount = await Visitor.countDocuments({ status: "inside" });
    const pendingCount = await Visitor.countDocuments({ status: "pending" });
    const activePasses = await Pass.countDocuments({ status: "active" });
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: "pending" });

    // Recent Check-in logs
    const recentLogs = await CheckLog.find()
      .sort({ createdAt: -1 })
      .limit(10);

    // Breakdown by department
    const deptBreakdown = await Visitor.aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } },
    ]);

    res.json({
      totalVisitors,
      insideCount,
      pendingCount,
      activePasses,
      totalAppointments,
      pendingAppointments,
      recentLogs,
      deptBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
