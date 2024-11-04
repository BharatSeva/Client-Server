const StatusCode = require('http-status-codes')
const Appointment = require("../schema/appointment")

// const { AppointmentCounter } = require("../Firebase/Service")

const CreateAppointment = async (req, res) => {
    try {
        const { fullname, health_id } = req.user

        console.log("BODY", req.body)
        console.log("USER", req.user)

        await Appointment.create({ ...req.body, fullname, health_id })
        res.status(StatusCode.CREATED).json({ message: "Appointment Successfully Created" })
        // AppointmentCounter(healthcareID.toString(), healthId.toString())
    } catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}

const GetAppointment = async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const { healthId } = req.user

    try {
        const appointments = await Appointment.find({ health_ID: healthId })
                                              .select(['-__v', '-_id'])
                                              .sort("-appointment_date")
                                              .limit(parseInt(limit))
        if (!appointments.length) {
            res.status(StatusCode.NOT_FOUND).json({ message: "No Any Appointment Log Found !" })
            return
        }
        res.status(StatusCode.OK).json({ appointments_details: appointments, appointments: appointments.length })
    } catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}
module.exports = {
    CreateAppointment,
    GetAppointment,
}