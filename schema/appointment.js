const mongoose = require("mongoose")

const Appoinments = new mongoose.Schema({
    health_id: {
        type: String,
        required: [true, "Health ID is Required"],
        maxlength: 30
    },
    appointment_date: {
        type: String,
        required: [true, "Date Is Required"]
    },
    appointment_time: {
        type: String,
        required: [true, "Time Is Required"]
    },
    healthcare_id: {
        type: String,
        required: [true, "Healthcare ID Is Required"],
        maxlength: 30
    },
    department: {
        type: String,
        required: [true, "Department Is must to have"],
        maxlength: 50
    },
    note: {
        type: String,
        maxlength: 30
    },
    fullname: {
        type: String,
        required: [true, "Full Name is Required"],
        maxlength: 30
    },
    healthcare_name: {
        type: String,
        required: [true, "HealthCare Name is Required"],
        maxlength: 30
    }
}, { timestamp: true })


module.exports = mongoose.model("appointments", Appoinments)