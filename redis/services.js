const { redis } = require("../redis/connect");
const StatusCode = require("http-status-codes");

// this is rate limiter
const rateLimiter = async (req, res, next) => {
    const userKey = `patient:rate_limit:${req.user.health_id}`;
    try {
        const currentRequests = await redis.incr(userKey);
        if (currentRequests === 1) {
            await redis.expire(userKey, process.env.WINDOW_SIZE_IN_SECONDS);
        }
        if (currentRequests > process.env.MAX_REQUESTS) {
            return res.status(StatusCode.TOO_MANY_REQUESTS).json({ message: "Too many requests, please try again later." });
        }
        next();
    } catch (err) {
        console.error("Rate limiter error:", err);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
};

const Setcaching = async (type, id, data) => {
    const cacheKey = `patient:${type}:${id}`;
    const expiration = 3600 * 24;
    try {
        await redis.set(cacheKey, JSON.stringify(data), "EX", expiration);
    } catch (error) {
        console.error("Error Setcaching:", error.message);
        // exit if found error
        process.exit(1);
    }
}

const Getcaching = async (type, id) => {
    const cacheKey = `patient:${type}:${id}`;
    try {
        let cachedData = await redis.get(cacheKey);
        if (cachedData) {
            const ttl = await redis.ttl(cacheKey);
            cachedData = JSON.parse(cachedData);
            return { cachedData, ttl };
        }
        return { cachedData: null, ttl: null }
    } catch (error) {
        console.error("Error retrieving from cache:", error.message);
    }
};


module.exports = {
    rateLimiter,
    Setcaching,
    Getcaching,
} 