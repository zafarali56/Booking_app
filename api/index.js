import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./models/User.js";
import cookieParser from "cookie-parser";

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "jshdjfh";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000; // Use process.env.PORT if available, default to 4000

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
  try {
    const userDocs = await User.create({
      first,
      last,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({ userDocs });
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDocs = await User.findOne({ email });
  if (userDocs) {
    const passOK = bcrypt.compareSync(password, userDocs.password);
    if (passOK) {
      jwt.sign(
        {
          email: userDocs.email,
          id: userDocs._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({ user: userDocs });
        }
      );
    } else {
      res.status(422).json("Pass Unmatched");
    }
  } else {
    res.status(404).json("User not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { first, last, email, _id } = await User.findById(userData.id);
      res.json({ first, last, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
