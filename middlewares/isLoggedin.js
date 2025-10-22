const  jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports.isLoggedin = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash("error","You are not logged in");
        return res.redirect("/");   
        // return res.send("You are not logged in");
    }   
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        let user = await userModel
        .findOne({ email: decoded.email })
        .select("-password")
        req.user = user;
        next();
    } catch (error) {
        req.flash("error", "You are not logged in");
        return res.redirect("/");
        // return res.send("You are not logged in");
    }
};