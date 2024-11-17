const jwt = require("jsonwebtoken");
const StatusCode = require("http-status-codes");
require('dotenv').config();
const { rateLimiter } = require("../redis/services")

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
            fullname: patient_payload.fullname,
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
