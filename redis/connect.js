const Redis = require("ioredis");
require('dotenv').config();

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

const connect2redis = async () => {
    await redis.ping()
        .then(response => {
            console.log("Redis connection successful:", response);
        })
        .catch(error => {
            console.error("Error connecting to Redis:", error.message);
        });
}

module.exports = {
    connect2redis,
    redis
}
