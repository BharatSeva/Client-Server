const express = require('express')
const responsetime = require('response-time')
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())

// metrics collection for prometheus and grafana
///////////////////////////////////////////////////
const fs = require('fs');
const path = require('path');
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register })

const ReqResTime = new client.Histogram({
    name: "http_express_req_res_time",
    help: "Duration of HTTP requests",
    labelNames: ["method", "route", "status_code"],
    buckets: [1, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 1000, 2000]
});

const totalReqCounter = new client.Counter({
    name: "total_request",
    help: "tell total request",
    labelNames: ["route"]
});
 
// Middleware to record response time
app.use(responsetime((req, res, time) => {
    // this will log request in .log file
    const logEntry = `IP_ADDR: ${req.ip} | Time: ${new Date().toISOString()} | Method: ${req.method} | URL: ${req.url} | Status: ${res.statusCode} | Duration: ${time.toFixed(2)} ms\n`;
    fs.appendFileSync(path.join(__dirname, 'req.log'), logEntry, (err) => {
        if (err) console.error("Error logging request duration:", err);
    });

    totalReqCounter.labels({ route: req.url }).inc();
    ReqResTime.labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode
    }).observe(time);
}));

app.get('/metrics', async (req, res) => {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics()
    res.send(metrics)
})

//////////////////////////////////




// Auth router
const PatientRouter_Authorization = require("./router/auth")
app.use('/api/v1/user/auth', PatientRouter_Authorization)

const auth_middleware = require("./middleware/authentication")

const Appointments = require("./router/appointment")
const services = require("./router/services")
app.use('/api/v1/user', auth_middleware, Appointments, services)


// Connect to MongoDB
const PORT = process.env.PORT
const ConnectDB = require("./database/mongodb")
const { connectRabbitMQ } = require("./rabbitmq/connect")
const { connectopostgres } = require("./database/postgres")
const { connect2redis } = require("./redis/connect")

const start = async () => {
    try {
        await ConnectDB(process.env.MONGOURL_USER);
        await connectRabbitMQ(process.env.RABBITMQ_URL);
        await connectopostgres()
        await connect2redis()
        app.listen(PORT, console.log(`Server is Listening to port ${PORT}.....`))
    } catch (error) {
        console.log("Something Went Wrong, Message: ", error.message)
    }
}
start();  