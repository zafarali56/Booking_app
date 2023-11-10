import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./models/User.js";
import Place from "./models/Place.js";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import multer from "multer";
import fs from "fs";

//temp
import { URL, fileURLToPath } from "url";
import path from "path";
import Booking from "./models/Booking.js";

const currentModuleURL = new URL(import.meta.url);
const currentModulePath = fileURLToPath(currentModuleURL);
const __dirname = path.dirname(currentModulePath);

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "jshdjfh";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000; // Use process.env.PORT if available, default to 4000

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
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
  .catch((err) => {
    console.error(err);
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

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const dest = path.join(__dirname, "uploads", newName);

  await imageDownloader.image({
    url: link,
    dest: dest,
  });

  res.json(dest);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];

    // Check if originalname is defined and not empty
    if (originalname) {
      const parts = originalname.split(".");
      if (parts.length >= 2) {
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace("uploads/", ""));
      } else {
        // Handle the case where the file name doesn't contain a dot (.) extension
        return res.status(422).json({ error: "Invalid file name" });
      }
    } else {
      // Handle the case where originalname is undefined or empty
      return res.status(422).json({ error: "Missing file name" });
    }
  }

  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;

  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;

  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDocs = await Place.findById(id);
    if (userData.id === placeDocs.owner.toString()) {
      placeDocs.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDocs.save();
      res.json("Updated");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.get("/bookings", (req, res) => {
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Start the server
