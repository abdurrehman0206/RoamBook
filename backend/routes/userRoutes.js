const User = require("../models/userModel");
const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  verifyToken,
} = require("../controllers/userControllers");
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/verifyToken", verifyToken);

module.exports = router;
