// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { generateZipFile } from "./zip.js";
import JSZip from "jszip";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  yob: Number,
  email: String,
});

// Create model
const User = mongoose.model("User", userSchema);

// Routes
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/api/chat", async (req, res) => {
  const { content } = req.body;
  const files = generateZipFile(content);
  const zip = new JSZip();
  files.forEach(({ path, content }) => {
    zip.file(path, content);
  });

  const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

  res.set({
    "Content-Type": "application/zip",
    "Content-Disposition": "attachment; filename=generated.zip",
  });

  res.send(zipBuffer);
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  console.log(username);

  const user = await User.findOne({ username: username });
  if (!user) return res.status(400).json({ error: "No user in db" });

  if (password == user.password) {
    res.status(200).json({ message: "Successfully login" });
  }
  res.status(201).json(user);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
