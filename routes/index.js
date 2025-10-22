const express = require("express");
const Product = require("../models/product-model");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/shop", async (req, res) => {
  try {
    let products = await Product.find({});
    
    // If no products in database, create dummy products
    if (products.length === 0) {
      products = [
        {
          name: "Clinge Bag",
          price: 1200,
          image: "/images/dummy1.jpg",
          bgColor: "#fbbf24",
          panelColor: "#dc2626",
          textColor: "#ffffff"
        },
        {
          name: "Stylish Backpack",
          price: 1500,
          image: "/images/dummy2.jpg",
          bgColor: "#10b981",
          panelColor: "#1f2937",
          textColor: "#ffffff"
        },
        {
          name: "Premium Wallet",
          price: 800,
          image: "/images/dummy3.jpg",
          bgColor: "#8b5cf6",
          panelColor: "#374151",
          textColor: "#ffffff"
        },
        {
          name: "Leather Jacket",
          price: 2500,
          image: "/images/dummy4.jpg",
          bgColor: "#f59e0b",
          panelColor: "#111827",
          textColor: "#ffffff"
        },
        {
          name: "Designer Shoes",
          price: 1800,
          image: "/images/dummy5.jpg",
          bgColor: "#ef4444",
          panelColor: "#1f2937",
          textColor: "#ffffff"
        },
        {
          name: "Smart Watch",
          price: 3200,
          image: "/images/dummy6.jpg",
          bgColor: "#06b6d4",
          panelColor: "#374151",
          textColor: "#ffffff"
        },
        {
          name: "Wireless Headphones",
          price: 2200,
          image: "/images/dummy7.jpg",
          bgColor: "#84cc16",
          panelColor: "#111827",
          textColor: "#ffffff"
        },
        {
          name: "Gaming Mouse",
          price: 1200,
          image: "/images/dummy8.jpg",
          bgColor: "#f97316",
          panelColor: "#1f2937",
          textColor: "#ffffff"
        }
      ];
    }
    
    res.render("shop", { products });
  } catch (err) {
    res.status(500).send("Failed to load products");
  }
});

router.get("/cart", (req, res) => {
  res.render("cart");
});

module.exports = router;
