const mongoose = require("mongoose");
const validator = require("validator");
const rateLimit = require("express-rate-limit");
const ShortUrl = require("./models/shortUrl");
const session = require("express-session");
const express = require("express");
const path = require("path");
const cors = require("cors");
const generateUniqueShortId = require("./generateUniqueShortId");

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

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://savesome.space"
      : "http://localhost:5173",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST"],
  allowedHeaders: ["content-type", "Authorization"],
};

app.use(cors(corsOptions));
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

    const newShortId = await generateUniqueShortId();

    const newShortUrl = new ShortUrl({
      full: req.body.fullUrl,
      short: newShortId,
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

  const sanitizedUrl = validator.isURL(shortUrl.full, {
    protocols: ["http", "https"],
    require_protocol: true,
  })
    ? shortUrl.full
    : "https://savesome.space";

  res.json({ url: sanitizedUrl });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
