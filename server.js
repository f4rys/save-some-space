const mongoose = require('mongoose');
const validator = require('validator');
const rateLimit = require('express-rate-limit');
const ShortUrl = require('./models/shortUrl');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const express = require('express');

const app = express();
require('dotenv').config();

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: false }));
app.use(limiter);
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

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', { shortUrls });
});

app.get('/privacy-policy', (req, res) => {
    res.render('privacy-policy');
});

app.get('/terms-of-service', (req, res) => {
    res.render('terms-of-service');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.post('/shortUrls', async (req, res) => {
    const existingShortUrl = await ShortUrl.findOne({ short: req.body.shortUrl }).exec();
    if (existingShortUrl) {
        return res.sendStatus(409);
    }

    const newShortUrl = new ShortUrl({
        full: req.body.fullUrl,
        short: req.body.shortUrl
    });

    await newShortUrl.save();
    res.json({ shortUrl: newShortUrl.short });
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl }).exec();
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    const sanitizedUrl = validator.isURL(shortUrl.full, { 
        protocols: ['http', 'https'], 
        require_protocol: true 
      }) ? shortUrl.full : 'https://savesome.space';
    
    res.redirect(sanitizedUrl);
});

app.listen(process.env.PORT || 5000); 
