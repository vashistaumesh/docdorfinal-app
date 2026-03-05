const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* ================================
   ✅ MIDDLEWARE
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://frontenddocdoradmin-ff3n.vercel.app",
      "https://mediumslateblue-porcupine-542940.hostingersite.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ================================
   ✅ MONGODB CONNECTION
================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

/* ================================
   ✅ ROUTES
================================ */

app.use("/api/auth", require("./routes/auth"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/patients", require("./routes/patients"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/dashboard", require("./routes/dashboard"));

/* ================================
   ✅ TEST ROUTE
================================ */

app.get("/", (req, res) => {
  res.send("🚀 DocDoor Backend Running");
});

/* ================================
   ✅ HEALTH CHECK API
================================ */

app.get("/api/health", (req, res) => {
  res.json({
    status: "✅ DocDoor Backend Running",
    time: new Date(),
  });
});

/* ================================
   ✅ ERROR HANDLER
================================ */

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    message: "Server Error",
    error: err.message,
  });
});

/* ================================
   ✅ SERVER START
================================ */

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`\n🚀 DocDoor Backend running on http://localhost:${PORT}`);
  console.log(`📊 API Endpoints: http://localhost:${PORT}/api/`);
  console.log(`🔗 MongoDB: Connected\n`);
});
