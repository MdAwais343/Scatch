const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res, next) => {
    try {
    let {fullName, email, password } = req.body;
    let user = await userModel.findOne({ email });
    console.log(user);
    if (user) {
      res.status(400);
      res.send("You already have an account,please login");
      return;
    }

    let salt = await  bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    let createdUser = await userModel.create({
      fullName,
      email,
      password: hash,
    });
    res.status(201).send(createdUser);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
};

module.exports.isAuthenticated = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            res.send("Email and password are required");
            return;
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            if (req.headers.accept && req.headers.accept.includes("text/html")) {
              req.flash("error", "Invalid email or password, please try again");
              res.redirect("/");
              return;
            }
            res.status(400).send("Invalid email or Password,please try again");
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password );
        if (!isMatch) {
            if (req.headers.accept && req.headers.accept.includes("text/html")) {
              req.flash("error", "Invalid email or password, please try again");
              res.redirect("/");
              return;
            }
            res.status(400).send("Invalid email or Password,please try again");
            return;
        }

        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 });

        if (req.headers.accept && req.headers.accept.includes("text/html")) {
            res.redirect("/shop");
            return;
        }
        res.send(user);
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
};
module.exports.logout = (req, res, next) => {
    res.clearCookie("token");
    res.send("Logged out successfully");
}; 