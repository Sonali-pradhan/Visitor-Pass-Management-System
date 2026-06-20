const express = require("express");
const cors = require("cors");

const app = express();

// =======================
// MIDDLEWARES
// =======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.json({
    message: "Visitor Pass Management API Running 🚀",
    status: "success",
  });
});

// =======================
// ROUTES
// =======================

// Auth Routes
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

// Visitor Routes
const visitorRoutes = require("./src/routes/visitorRoutes");
app.use("/api/visitors", visitorRoutes);

const checkRoutes = require("./src/routes/checkRoutes");
app.use("/api/check", checkRoutes);

// =======================
// HANDLE INVALID ROUTES
// =======================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

module.exports = app;