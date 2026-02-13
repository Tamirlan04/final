const express = require("express");
const cors = require("cors");

const orderRoutes = require("./routes/orders.routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5500",
    "https://front-tezprint.netlify.app"
  ]
}));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
