const mongoose = require("mongoose");
const path = require("path");
const request = require("supertest");
const shortId = require('shortid');
const app = require("./server");
const ShortUrl = require("./models/shortUrl");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

describe("ShortUrl Model and Server", () => {
  let testServer;
  let serverInstance;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    serverInstance = app.listen(0);
    const port = serverInstance.address().port;
    testServer = request(`http://localhost:${port}`);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    serverInstance.close();
  });

  it("should create a new short URL with a default short code", async () => {
    const url = new ShortUrl({ full: "https://www.example.com" });
    await url.save();
    expect(url.short).toBeTruthy();
    expect(url.clicks).toBe(0);
  });

  it("should return all short URLs on GET /", async () => {
    const res = await testServer.get("/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("shortUrls");
  });

  it("should create a new short URL on POST /shortUrls", async () => {
    const fullUrl = "https://www.new-url.com";
    const shortUrlCode = shortId.generate();
  
    const res = await testServer
      .post("/shortUrls")
      .send({ fullUrl: fullUrl, shortUrl: shortUrlCode });
  
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("shortUrl", shortUrlCode);
  });

  it("should redirect to the full URL on GET /:shortUrl", async () => {
    const fullUrl = "https://www.redirect-test.com";
    const shortUrlCode = shortId.generate(); 
    await new ShortUrl({
      full: fullUrl,
      short: shortUrlCode,
    }).save();
  
    const res = await testServer.get(`/${shortUrlCode}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("url", fullUrl);
  });

  it("should return 404 if short URL not found on GET /:shortUrl", async () => {
    const res = await testServer.get("/non-existent-code");
    expect(res.status).toBe(404);
  });

});