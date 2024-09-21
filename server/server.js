const mongoose = require("mongoose");
const validator = require("validator");
const rateLimit = require("express-rate-limit");
const ShortUrl = require("./models/shortUrl");
const session = require("express-session");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cron = require('node-cron');
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

const reservedRoutes = ["/about", "/privacy-policy", "/terms-of-service"];

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
    const { fullUrl, customUrl, expirationDays, neverExpire } = req.body;
    
    let shortId = customUrl;
    let expiresAt = null;

    if (customUrl && reservedRoutes.includes(`/${customUrl}`)) {
      return res.status(403).json({ error: "this custom URL is forbidden." });
    }

    if (customUrl) {
      const existingCustomUrl = await ShortUrl.findOne({ short: customUrl }).exec();
      if (existingCustomUrl) {
        return res.status(409).json({ error: "this custom URL already exists." });
      }
    } else {
      shortId = await generateUniqueShortId();
    }

    if (!neverExpire) {
      if (expirationDays) {
        expiresAt = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000);
      } else {
        expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      }
    }

    const newShortUrl = new ShortUrl({
      full: fullUrl,
      short: shortId,
      expiresAt: expiresAt,
    });

    await newShortUrl.save();
    res.json({ shortUrl: newShortUrl.short, expiresAt: newShortUrl.expiresAt });
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

cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    const result = await ShortUrl.deleteMany({ expiresAt: { $lte: now } });
    console.log(`${result.deletedCount} expired URLs deleted.`);
  } catch (error) {
    console.error("Error deleting expired URLs:", error);
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
