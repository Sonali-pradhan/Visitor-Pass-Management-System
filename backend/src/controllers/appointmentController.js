const Appointment = require("../models/Appointment");
const Visitor = require("../models/Visitor");
const Pass = require("../models/Pass");
const QRCode = require("qrcode");

// CREATE APPOINTMENT (PRE-BOOKING)
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({
      message: "Appointment scheduled successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL APPOINTMENTS
exports.getAppointments = async (req, res) => {
  try {
    const { status, host, date } = req.query;
    let query = {};

    if (status) query.status = status;
    if (host) query.host = host;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      query.date = { $gte: start, $lt: end };
    }

    const appointments = await Appointment.find(query).populate("host").sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE APPOINTMENT STATUS (Approve / Reject)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // If approved, automatically create Visitor & Pass
    if (status === "approved") {
      const passId = "VP-" + Math.floor(100000 + Math.random() * 900000);

      const visitor = await Visitor.create({
        passId,
        name: appointment.visitorName,
        email: appointment.visitorEmail,
        phone: appointment.visitorPhone,
        company: appointment.company,
        department: appointment.department,
        purpose: appointment.purpose,
        host: appointment.host,
        hostName: appointment.hostName,
        appointmentId: appointment._id,
        status: "approved",
      });

      const qrData = await QRCode.toDataURL(
        JSON.stringify({
          passId: visitor.passId,
          visitorId: visitor._id,
          name: visitor.name,
        })
      );

      visitor.qrCode = qrData;
      await visitor.save();

      await Pass.create({
        passId: visitor.passId,
        visitorId: visitor._id,
        visitorName: visitor.name,
        hostName: visitor.hostName,
        qrCode: visitor.qrCode,
        passType: "Pre-Booked",
        validFrom: appointment.date,
        validTo: new Date(new Date(appointment.date).getTime() + 24 * 60 * 60 * 1000),
        status: "active",
      });
    }

    res.json({
      message: `Appointment ${status} successfully`,
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE APPOINTMENT
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
