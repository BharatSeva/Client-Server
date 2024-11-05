const jwt = require("jsonwebtoken");
const StatusCode = require("http-status-codes");
const Redis = require("ioredis"); 
require('dotenv').config();

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

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

// Authentication Middleware
const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: "Invalid Request, Token expired" });
    }

    const token = authHeader.split(' ')[1];
    try {
        const patient_payload = jwt.verify(token, process.env.Patient_JWT_SECRET_KEY);
        req.user = {
            userID: patient_payload.Patient_USERID,
            fullname: patient_payload.name,
            health_id: patient_payload.healthId,
            email: patient_payload.email,
        };

        // check for ratelimiter also
        await rateLimiter(req, res, next);
    } catch (err) {
        res.status(StatusCode.UNAUTHORIZED).json({ message: err.message });
    }
};

module.exports = authentication;
