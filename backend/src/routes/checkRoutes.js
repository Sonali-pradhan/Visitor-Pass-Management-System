const express = require("express");
const router = express.Router();

const { checkIn, checkOut } = require("../controllers/checkController");
const authMiddleware = require("../middleware/authMiddleware");

// scan QR → check-in
router.post("/in", authMiddleware, checkIn);

// scan QR → check-out
router.post("/out", authMiddleware, checkOut);

module.exports = router;