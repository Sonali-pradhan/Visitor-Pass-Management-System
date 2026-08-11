const express = require("express");
const router = express.Router();

const { register, login, getMe, getHosts, getUsers } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.get("/hosts", getHosts);
router.get("/users", authMiddleware, getUsers);

module.exports = router;