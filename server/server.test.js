const mongoose = require("mongoose");
const path = require("path");
const request = require("supertest");
const shortId = require("shortid");
const app = require("./server");
const ShortUrl = require("./models/shortUrl");
const generateUniqueShortId = require("./generateUniqueShortId");

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

  test("should create a new short URL with a generated short code", async () => {
    const newShortId = await generateUniqueShortId();
    const url = new ShortUrl({
      full: "https://www.example.com",
      short: newShortId,
    });
    await url.save();
    expect(url.short).toBeTruthy();
  });

  test("should return all short URLs on GET /", async () => {
    const res = await testServer.get("/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("shortUrls");
  });

  test("should create a new short URL on POST /shortUrls", async () => {
    const fullUrl = "https://www.new-url.com";

    const res = await testServer.post("/shortUrls").send({ fullUrl: fullUrl });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("shortUrl");
    expect(res.body.shortUrl).toHaveLength(9);
  });

  test("should redirect to the full URL on GET /:shortUrl", async () => {
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

  test("should return 404 if short URL not found on GET /:shortUrl", async () => {
    const res = await testServer.get("/non-existent-code");
    expect(res.status).toBe(404);
  });

  test("should return an error for forbidden custom URLs", async () => {
    const fullUrl = "https://www.example.com";
    const forbiddenCustomUrl = "about";

    const res = await testServer.post("/shortUrls").send({
      fullUrl: fullUrl,
      customUrl: forbiddenCustomUrl,
    });

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("error", "this custom URL is forbidden.");
  });

  test("should return an error for already existing custom URL", async () => {
    const fullUrl = "https://www.example.com";
    const customUrl = "my-custom-url";

    await testServer
      .post("/shortUrls")
      .send({ fullUrl: fullUrl, customUrl: customUrl });

    const res = await testServer.post("/shortUrls").send({
      fullUrl: "https://www.another-url.com",
      customUrl: customUrl,
    });

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("error", "this custom URL already exists.");
  });

  test("should set a default expiration date of 7 days if none provided", async () => {
    const fullUrl = "https://www.no-expiry-specified.com";

    const res = await testServer.post("/shortUrls").send({ fullUrl: fullUrl });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("shortUrl");
    expect(new Date(res.body.expiresAt)).toBeTruthy();

    const expiresAt = new Date(res.body.expiresAt);
    const expectedExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    expect(expiresAt.toDateString()).toBe(expectedExpiresAt.toDateString());
  });

  test("should set custom expiration date based on user input", async () => {
    const fullUrl = "https://www.expire-in-3-days.com";
    const expirationDays = 3;

    const res = await testServer.post("/shortUrls").send({
      fullUrl: fullUrl,
      expirationDays: expirationDays,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("shortUrl");

    const expiresAt = new Date(res.body.expiresAt);
    const expectedExpiresAt = new Date(
      Date.now() + expirationDays * 24 * 60 * 60 * 1000
    );

    expect(expiresAt.toDateString()).toBe(expectedExpiresAt.toDateString());
  });
});
