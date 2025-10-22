const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,  contact: Number,
  picture: String,
  products: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Owner", ownerSchema);
