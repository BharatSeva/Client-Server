const express = require('express')
const app = express()
app.use(express.json())





// Patient Authorization Router Goes Here
const PatientRouter_Authorization = require("./Router/Patient_Authorization_Router")
app.use('/api/v1/user/auth/login', PatientRouter_Authorization)

// // Below Will handle PatientRoutings
// const Patient_Authentication = require("./MiddleWare/Patient_Authentication");
// const Patient = require("./Router/Patient")
// const PatientBioData = require("./Router/Patient_BioData")
// const PatientDetails_Router = require("./Router/Patient_Details_Router");
// const Appointments = require("./Router/AppointsmentRouter")
// app.use('/api/v1/userdetails', Patient_Authentication, PatientDetails_Router, PatientBioData, Appointments)
// app.use('/api/v1/user', Patient_Authentication, Patient)
 
// // HealthCare Login/Register Function Goes Here
// const Authorizationrouter = require("./Router/HIP_Authorization_Router");
// app.use("/api/v1/healthcareauth", Authorizationrouter)




// Connect to MongoDB
const ConnectDB = require("./MongoDB/Database")
const PORT = process.env.PORT || 5000;
// If cloud is not present then use local cluster
const URL = process.env.MONGODB_URL || "mongodb://mongodb:27017/mydatabase"
const start = async () => {
    try {
        await ConnectDB(URL);
        app.listen(PORT, console.log(`Server is Listening to port ${PORT}.....`))
    } catch (error) {
        console.log("Something Went Wrong, Message: ", error.message)
    }
}
start(); 