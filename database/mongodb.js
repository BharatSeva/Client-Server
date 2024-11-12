const mongoose = require("mongoose")

// Adding min of 1 connection pool to manage request efficiently
// sockettimeout to 5 seconds, and serverSelectionTimeout to 10 seconds
const connect = (URL) => {
    return mongoose
        .connect(URL, {
            maxPoolSize: 10,
            minPoolSize: 2,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 60000,
        })
        .then((res) => console.log("Connected To MongoDB 😊"))
        .catch((err) => console.log("Something Went Wrong Message: ", err.message, err))
}

module.exports = connect