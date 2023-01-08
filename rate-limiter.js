const { RateLimiterRedis } = require("rate-limiter-flexible");
const Redis = require("ioredis");
const { redisConnectionString } = require("./config");

const redisClient = new Redis(redisConnectionString, {
  enableOfflineQueue: false,
});

const opts = {
  storeClient: redisClient,
  points: 2, // Numer of requests
  duration: 10, // Per 10 seconds
};

const rateLimiterRedis = new RateLimiterRedis(opts);

module.exports = rateLimiterRedis;
