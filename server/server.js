const mongoose = require('mongoose');
const validator = require('validator');
const rateLimit = require('express-rate-limit');
const ShortUrl = require('./models/shortUrl');
const session = require('express-session');
const express = require("express");
const path = require('path');
const cors = require("cors");

const app = express();
require('dotenv').config({ path: path.join(__dirname, '../.env') }); 

mongoose.connect(process.env.MONGODB)
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(cors());
app.use(session({
  name: 'ss_sid',
  secret: process.env.SERVER_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
      domain: 'savesome.space',
      path: '/',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
  },
}));

app.get("/api", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.json({ shortUrls: shortUrls });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
