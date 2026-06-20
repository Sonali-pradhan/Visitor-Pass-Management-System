const express = require("express");
const router = express.Router();

const {
  createVisitor,
  getVisitors,
  checkIn,
  checkOut,
} = require("../controllers/visitorController");

const authMiddleware = require("../middleware/authMiddleware");

// visitor creation
router.post("/", authMiddleware, createVisitor);

// get visitors
router.get("/", authMiddleware, getVisitors);

// check-in
router.post("/checkin", authMiddleware, checkIn);

// check-out
router.post("/checkout", authMiddleware, checkOut);

module.exports = router;