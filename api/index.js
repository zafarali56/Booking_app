import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

const bcryptSalt = bcrypt.genSaltSync(10);

dotenv.config();

const app = express();
const port = process.env.PORT || 4000; // Use process.env.PORT if available, default to 4000

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true, // Add these options
    useUnifiedTopology: true, // Add these options
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:");
  });

// Define your routes
app.get("/test", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/register", async (req, res) => {
  const { first, last, email, password } = req.body;
  const userDocs = await User.create({
    first,
    last,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });

  res.json({ userDocs });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
