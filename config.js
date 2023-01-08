const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  redisConnectionString: `redis://${process.env.REDIS_USER}:${process.env.REDIS_PW}@${process.env.REDIS_URL}`,
};
