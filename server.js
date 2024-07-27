const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');  

const ShortUrl = require('./models/shortUrl');  

const rateLimit = require('express-rate-limit');
const validator = require('validator');

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
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: false }));
app.use(limiter);

app.use(
    session({
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
        },
    })
);

app.use(flash());

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    const latestShortUrl = req.flash('latestShortUrl')[0];
    res.render('index', { shortUrls: shortUrls, latestShortUrl: latestShortUrl });
});

app.post('/shortUrls', async (req, res) => {
    const existingShortUrl = await ShortUrl.findOne({ short: req.body.shortUrl });
    if (existingShortUrl) {
        return res.sendStatus(409);
    }

    const newShortUrl = new ShortUrl({
        full: req.body.fullUrl,
        short: req.body.shortUrl
    });

    await newShortUrl.save();

    const shortUrls = await ShortUrl.find();

    req.flash('latestShortUrl', newShortUrl);
    res.render('index', { 
        shortUrls: shortUrls, 
        latestShortUrl: newShortUrl
    });
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();  


    if (
        !validator.isURL(shortUrl.full, {
            protocols: ['http', 'https'],
            require_protocol: true,
        })
    ) {
        return res.status(400).send('Invalid redirect URL');
    }

    res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 5000); 