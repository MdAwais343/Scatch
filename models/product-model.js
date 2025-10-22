const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
  description: String,
  image: String,
  discount: {
    type: Number,
    default: 0,
  },
  bgColor: {
    type: String,
    default: "#000000",
  },
  panelColor: {
    type: String,
    default: "#000000",
  },
  textColor: {
    type: String,
    default: "#000000",
  },
});

module.exports = mongoose.model("Product", productSchema);
