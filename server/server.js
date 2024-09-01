const mongoose = require("mongoose");
const validator = require("validator");
const rateLimit = require("express-rate-limit");
const ShortUrl = require("./models/shortUrl");
const session = require("express-session");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
require("dotenv").config({ path: path.join(__dirname, "../.env") });

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(limiter);
app.use(express.json());
app.use(
  session({
    name: "ss_sid",
    secret: process.env.SERVER_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      domain: "savesome.space",
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  })
);

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.json({ shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  try {
    const existingShortUrl = await ShortUrl.findOne({
      short: req.body.shortUrl,
    }).exec();
    if (existingShortUrl) {
      return res.sendStatus(409);
    }

    const newShortUrl = new ShortUrl({
      full: req.body.fullUrl,
      short: req.body.shortUrl,
    });

    await newShortUrl.save();
    res.json({ shortUrl: newShortUrl.short });
  } catch (error) {
    console.error("Error in /shortUrls:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({
    short: req.params.shortUrl,
  }).exec();
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  const sanitizedUrl = validator.isURL(shortUrl.full, {
    protocols: ["http", "https"],
    require_protocol: true,
  })
    ? shortUrl.full
    : "https://savesome.space";

  res.redirect(sanitizedUrl);
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
