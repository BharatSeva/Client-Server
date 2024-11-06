const StatusCode = require('http-status-codes')
const Appointment = require("../schema/appointment")
// rabbitmq channel
const { channel, connection } = require("../rabbitmq/connect")


// create apppointment --> into rabbitmq
const CreateAppointment = async (req, res) => {
    try {
        const { fullname, health_id } = req.user

        // Save to database
        // await Appointment.create({ ...req.body, fullname, health_id })

        // Send the appointment to RabbitMQ
        const QUEUE_NAME = 'appointments_queue';
        const msgChannel = channel();
        if (!msgChannel) {
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "RabbitMQ channel is not available." });
        }
        const appointmentMessage = {
            fullname,
            health_id,
            ...req.body,
            status: "Pending"
        };
        msgChannel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(appointmentMessage)), {
            persistent: true,
        });


        res.status(StatusCode.OK).json({ message: "Appointment Created" })
    } catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}


const GetAppointment = async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    let status = req.query.status;
    const { health_id } = req.user;

    try {
        let query = { health_id };
        const validStatuses = ["Pending", "Confirmed", "Rejected", "Not Available"];
        if (status && validStatuses.includes(status)) {
            query.status = status;
        }

        // find according to query specified
        const appointments = await Appointment.find(query)
            .select(['-__v', '-_id'])
            .sort("-appointment_date")
            .limit(limit);

        if (!appointments.length) {
            return res.status(StatusCode.NOT_FOUND).json({ message: "No Appointment Log Found!" });
        }

        res.status(StatusCode.OK).json({ appointments_details: appointments, fetched: appointments.length });
    } catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message });
    }
};


// fetch healthcare infos for appoinments
const { db } = require("../database/postgres")
const { Op } = require('sequelize');
const appoint_infos = db.appoint_info

// find hospital name
const appointment_info = async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const { name } = req.query;

    // check wheather the name parameter is present or not
    let filter = true;
    if (!name || name.trim() === "") {
        filter = false;
    }
    try {
        let info = await appoint_infos.findAll({
            attributes: [
                'healthcare_name',
                'healthcare_id',
                'healthcare_license',
                'country',
                'state',
                'city',
                'landmark',
                'date_of_registration'
            ],
            where: name
                ? { healthcare_name: { [Op.iLike]: `%${name}%` } }
                : null,
            limit: limit != null ? limit : 10
        });
        res.status(200).json({ healthcare: info, fetched: info.length, filter });
    } catch (err) {
        console.error("Error fetching preferences:", err.message);
        res.status(500).json({ status: 'Could not process your request' });
    }
};

module.exports = {
    CreateAppointment,
    GetAppointment,


    appointment_info,
}