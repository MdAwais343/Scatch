const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
 const {registerUser,isAuthenticated } = require("../controllers/authControllers");

router.get("/", (req, res) => {
  res.send("Hey, this is the users router");
});

router.post("/register",registerUser);
router.post("/login",isAuthenticated);
router.post("/logout", (req, res) => {
  res.send("logout");
});
module.exports = router;

