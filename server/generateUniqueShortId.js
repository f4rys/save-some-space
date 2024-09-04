const shortId = require('shortid');
const ShortUrl = require('./models/shortUrl');

async function generateUniqueShortId() {
  let unique = false;
  let newShortId;

  while (!unique) {
    newShortId = shortId.generate();
    const existingShortUrl = await ShortUrl.findOne({ short: newShortId }).exec();
    if (!existingShortUrl) {
      unique = true;
    }
  }

  return newShortId;
}

module.exports = generateUniqueShortId;
