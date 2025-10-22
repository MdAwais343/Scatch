const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.post("/create", async function (req, res) {
  let owners = await ownerModel.find();
  if (owners.length > 0) {
    res.status(400);
    res.send("Owners already created");
    return;
  }
  let { fullName, email, password } = req.body;
  let createdOwner = await ownerModel.create({
    fullName,
    email,
    password,
  });
  res.status(201).send(createdOwner);
});
router.get("/admin", (req, res) => {
  res.render("createproducts");
});

module.exports = router;
