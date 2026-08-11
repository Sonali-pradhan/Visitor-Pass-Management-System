require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const QRCode = require("qrcode");

const User = require("./models/User");
const Visitor = require("./models/Visitor");
const Pass = require("./models/Pass");
const Appointment = require("./models/Appointment");
const CheckLog = require("./models/CheckLog");
const connectDB = require("./config/db");

const seedData = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for seeding...");

    // Clear existing
    await User.deleteMany({});
    await Visitor.deleteMany({});
    await Pass.deleteMany({});
    await Appointment.deleteMany({});
    await CheckLog.deleteMany({});

    const passwordHash = await bcrypt.hash("123456", 10);

    // Create users
    const admin = await User.create({
      name: "Alex Vance (Admin)",
      email: "admin@system.com",
      password: passwordHash,
      role: "admin",
      department: "Administration",
      phone: "+1 555-0100",
    });

    const guard = await User.create({
      name: "Marcus Brody (Security)",
      email: "security@system.com",
      password: passwordHash,
      role: "security",
      department: "Security & Safety",
      phone: "+1 555-0101",
    });

    const emp1 = await User.create({
      name: "Dr. Sarah Jenkins",
      email: "employee@system.com",
      password: passwordHash,
      role: "employee",
      department: "Computer Science",
      phone: "+1 555-0102",
    });

    const emp2 = await User.create({
      name: "Prof. Robert Lang",
      email: "robert@system.com",
      password: passwordHash,
      role: "employee",
      department: "Engineering",
      phone: "+1 555-0103",
    });

    console.log("Users created successfully!");

    // Create sample visitors & passes
    const sampleVisitors = [
      {
        passId: "VP-882194",
        name: "David Miller",
        email: "david.m@gmail.com",
        phone: "+1 555-4321",
        company: "TechCorp Labs",
        department: "Computer Science",
        purpose: "Guest Lecture on AI",
        host: emp1._id,
        hostName: emp1.name,
        status: "inside",
        checkInTime: new Date(Date.now() - 45 * 60 * 1000),
      },
      {
        passId: "VP-910243",
        name: "Elena Rostova",
        email: "elena.r@fintech.io",
        phone: "+1 555-9876",
        company: "FinTech Systems",
        department: "Engineering",
        purpose: "Partnership Meeting",
        host: emp2._id,
        hostName: emp2.name,
        status: "approved",
      },
      {
        passId: "VP-304912",
        name: "Carlos Mendez",
        email: "carlos.m@construct.com",
        phone: "+1 555-2468",
        company: "Apex Construction",
        department: "Administration",
        purpose: "Site Inspection",
        host: admin._id,
        hostName: admin.name,
        status: "outside",
        checkInTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
        checkOutTime: new Date(Date.now() - 30 * 60 * 1000),
      },
    ];

    for (let item of sampleVisitors) {
      const qrData = await QRCode.toDataURL(
        JSON.stringify({
          passId: item.passId,
          name: item.name,
        })
      );
      item.qrCode = qrData;

      const v = await Visitor.create(item);

      await Pass.create({
        passId: v.passId,
        visitorId: v._id,
        visitorName: v.name,
        hostName: v.hostName,
        qrCode: v.qrCode,
        passType: "Standard",
        validFrom: new Date(),
        validTo: new Date(Date.now() + 24 * 60 * 60 * 1000),
        status: "active",
      });

      if (v.status === "inside" || v.status === "outside") {
        await CheckLog.create({
          visitor: v._id,
          passId: v.passId,
          visitorName: v.name,
          checkInTime: v.checkInTime,
          checkOutTime: v.checkOutTime,
          status: v.status === "inside" ? "inside" : "outside",
          gate: "Main Gate A",
          guardName: guard.name,
        });
      }
    }

    console.log("Visitors & Passes created successfully!");

    // Create sample appointments
    await Appointment.create({
      visitorName: "Sophia Martinez",
      visitorEmail: "sophia.m@designs.com",
      visitorPhone: "+1 555-7788",
      company: "Creative Studio",
      host: emp1._id,
      hostName: emp1.name,
      department: "Computer Science",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      timeSlot: "10:30 AM",
      purpose: "Campus UI/UX Design Consultation",
      status: "pending",
    });

    console.log("Database Seed Completed Successfully! 🚀");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seedData();
