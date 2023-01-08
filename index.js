const express = require("express");
const path = require("path");
const rateLimiterRedis = require("./rate-limiter");

const app = express();

const getIP = (req) =>
  req.ip ||
  req.headers["x-real-ip"] ||
  req.headers["x-forwarded-for"] ||
  req.socket.remoteAddress;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api", async (req, res) => {
  const ip = getIP(req);

  try {
    await rateLimiterRedis.consume(ip);
    return res.status(200).json({
      message: `Call made from IP: ${ip}`,
    });
  } catch (rejRes) {
    return res.status(429).json({
      message: `Too many requests for IP: ${ip}`,
    });
  }
});

app.listen(process.env.port || 3000);
console.log("Running at Port 3000");

// Export the Express API
module.exports = app;
