const mongoose = require("mongoose");
const Order = require("../models/Order");

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

exports.createOrder = async (req, res, next) => {
  try {
    const { name, phone, type, deadline, designFileName } = req.body;

    if (!name || !phone || !type || !deadline) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = await Order.create({
      name,
      phone,
      type,
      deadline,
      designFileName: designFileName || ""
    });

    return res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "Invalid id" });

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: "Not found" });

    return res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "Invalid id" });

    const { name, phone, type, deadline, designFileName } = req.body;

    if (!name || !phone || !type || !deadline) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        type,
        deadline,
        designFileName: designFileName || ""
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Not found" });

    return res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "Invalid id" });

    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Not found" });

    return res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
