// Load .env only in local dev
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");

const smsController = require("../controllers/smsController");

const app = express();
const router = express.Router();

// timezone
process.env.TZ = "Asia/Tashkent";

// =======================
// ✅ CORS (safe fallback)
// =======================
app.use(cors({
  origin: "*", // change later if needed
}));

// =======================
// ✅ Body parsers
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// ❌ Static uploads (disabled for Netlify)
// =======================
// app.use('/uploads', express.static(__dirname + '/uploads'));

// =======================
// ✅ DB connection (cached)
// =======================
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.DB_URI) {
    throw new Error("DB_URI is NOT defined in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.DB_URI);
    isConnected = db.connections[0].readyState;

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
};

// =======================
// ✅ Ensure DB per request
// =======================
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Database connection failed",
      details: err.message,
    });
  }
});

// =======================
// ✅ Debug route
// =======================
router.get("/test", (req, res) => {
  res.json({ ok: true });
});
// =======================
// ✅ Routes (FIXED: no /api duplication)
// =======================
router.use("/products", require("../routes/productRoutes"));
router.use("/sold-products", require("../routes/soldProductRoutes"));
router.use("/return-products", require("../routes/returnProductRoutes"));
router.use("/entry-products", require("../routes/entryProductRoutes"));
router.use("/outlays", require("../routes/outlayRoutes"));
router.use("/", require("../routes/users/userRoutes"));
router.use("/orders", require("../routes/orderRoutes"));



// =======================
// ✅ Mount router for Netlify
// =======================
app.use("/.netlify/functions/app", router);

// =======================
// ✅ Global error handler
// =======================
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);

  res.status(500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// =======================
// ✅ Export handler
// =======================
module.exports.handler = serverless(app);