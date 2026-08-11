const express = require("express");
const router = express.Router();

const {
  createVisitor,
  getVisitors,
  getVisitorById,
  updateVisitorStatus,
  deleteVisitor,
  checkIn,
  checkOut,
} = require("../controllers/VisitorController");

// Visitor creation (public or authenticated)
router.post("/", createVisitor);

// Get visitors list
router.get("/", getVisitors);

// Get single visitor
router.get("/:id", getVisitorById);

// Update visitor status
router.put("/:id/status", updateVisitorStatus);

// Delete visitor
router.delete("/:id", deleteVisitor);

// Check-in
router.post("/checkin", checkIn);

// Check-out
router.post("/checkout", checkOut);

module.exports = router;