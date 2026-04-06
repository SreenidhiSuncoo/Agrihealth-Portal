console.log("RUNNING NEW SERVER FILE ");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const FormData = require("form-data");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

mongoose.connect("mongodb://127.0.0.1:27017/plantDB")
.then(() => console.log("MongoDB connected "))
.catch(err => console.log(err));

// ─── SCHEMAS ───────────────────────────────────────────
const DiseaseSchema = new mongoose.Schema({
  name: String,
  cause: String,
  prevention: String,
  cure: String
});
const Disease = mongoose.model("Disease", DiseaseSchema);

const LogSchema = new mongoose.Schema({
  plant: String,
  condition: String,
  confidence: Number,
  is_healthy: Boolean,
  status: String, // "healthy", "diseased", "invalid"
  timestamp: { type: Date, default: Date.now },
  ip: String
});
const Log = mongoose.model("Log", LogSchema);

// ─── ROUTES ────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Backend running ");
});

// Predict — forwards image to Python Flask, saves log for everything
app.post("/predict", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const formData = new FormData();
    formData.append("image", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await fetch("http://localhost:5001/ml-predict", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    // ✅ Log everything — valid and invalid
    if (result.error === "not_a_leaf") {
      // Log invalid image
      await Log.create({
        plant: "Unknown",
        condition: "Invalid image",
        confidence: result.confidence,
        is_healthy: false,
        status: "invalid",
        ip: req.ip
      });
    } else if (!result.error) {
      // Log valid prediction
      await Log.create({
        plant: result.plant,
        condition: result.condition,
        confidence: result.confidence,
        is_healthy: result.is_healthy,
        status: result.is_healthy ? "healthy" : "diseased",
        ip: req.ip
      });
    }

    res.json(result);

  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({ error: "Prediction failed. Make sure Python server is running." });
  }
});

// Diseases — fetch all from MongoDB
app.get("/diseases", async (req, res) => {
  const data = await Disease.find();
  res.json(data);
});

// Logs — fetch last 50 requests for developers
app.get("/logs", async (req, res) => {
  const logs = await Log.find().sort({ timestamp: -1 }).limit(50);
  res.json(logs);
});

// ───────────────────────────────────────────────────────
app.listen(5000, () => {
  console.log("Server running on port 5000");
});