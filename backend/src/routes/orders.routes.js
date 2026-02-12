const express = require("express");
const Order = require("../models/Order");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = express.Router();

// user creates order
router.post("/", auth, async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order failed" });
  }
});


// user sees only his orders
router.get("/my", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

// admin sees all
router.get("/", auth, admin, async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// admin deletes
router.delete("/:id", auth, admin, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
