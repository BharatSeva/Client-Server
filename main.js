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


// const Patient_Authentication = require("./MiddleWare/Patient_Authentication");
// const Patient = require("./Router/Patient")
// const PatientBioData = require("./Router/Patient_BioData")
// const PatientDetails_Router = require("./Router/Patient_Details_Router");
// app.use('/api/v1/userdetails', Patient_Authentication, PatientDetails_Router, PatientBioData, Appointments)
// app.use('/api/v1/user', Patient_Authentication, Patient)
 
 


// Connect to MongoDB
const ConnectDB = require("./database/mongodb")
const PORT = process.env.PORT || 3000;
const URL = process.env.URL
const start = async () => {
    try {
        await ConnectDB(URL);
        app.listen(PORT, console.log(`Server is Listening to port ${PORT}.....`))
    } catch (error) {
        console.log("Something Went Wrong, Message: ", error.message)
    } 
}
start();  