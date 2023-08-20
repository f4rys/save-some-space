const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

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

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));

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

    req.flash('latestShortUrl', newShortUrl);

    res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);