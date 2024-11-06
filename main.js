const express = require('express')
const app = express()
app.use(express.json())


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
        await ConnectDB(process.env.MONGOURL);
        await connectRabbitMQ(process.env.RABBITMQ_URL);
        await connectopostgres()
        await connect2redis()
        app.listen(PORT, console.log(`Server is Listening to port ${PORT}.....`))
    } catch (error) {
        console.log("Something Went Wrong, Message: ", error.message)
    }
}
start();  