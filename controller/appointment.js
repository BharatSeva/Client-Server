// rabbitmq channel
const { channel, connection } = require("../rabbitmq/connect")
const StatusCode = require('http-status-codes')
const { db } = require("../database/postgres")
const healthcare_profile = db.healthcare_profile
const appointments = db.appointments

const { Op, Sequelize, ValidationError } = require('sequelize');

// create apppointment --> into rabbitmq
const CreateAppointment = async (req, res) => {
    try {
        const { fullname, health_id } = req.user;
        // extract data from request,
        // create payload
        const appointmentData = {
            fullname,
            health_id,
            ...req.body,
            status: "Pending",
            created_at: new Date(),
            updated_at: new Date(),
        };

        try {
            await appointments.build(appointmentData).validate();
        } catch (validationError) {
            if (validationError instanceof ValidationError) {
                return res.status(StatusCode.BAD_REQUEST).json({
                    status: "Payload not valid!",
                    message: validationError.errors.map((e) => e.message),
                });
            }
            throw validationError;
        }

        // push into appointments_queue
        const QUEUE_NAME = "appointments_queue";
        const msgChannel = channel();
        if (!msgChannel) {
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                message: "Something went wrong from our side.",
            });
        }

        msgChannel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(appointmentData)), {
            persistent: true,
        });

        res.status(StatusCode.CREATED).json({
            status: "Appointment Successfully created!",
            message: "Wait for it to reflect on portal it may take sometime",
            // appointment_details: appointmentData,
        });
    } catch (err) {
        console.log(err.message)
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message });
    }
}

const GetAppointment = async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    let { status, healthcare_name, department } = req.query;
    const { health_id } = req.user;

    try {
        let query = {
            where: { health_id },
            limit,
            order: [['appointment_date', 'DESC']],
            attributes: { exclude: ['__v', 'id', 'health_id'] }
        };
        const validStatuses = ["Pending", "Confirmed", "Rejected", "Not Available"];
        if (status && validStatuses.includes(status)) {
            query.where.status = status;
        }
        if (healthcare_name) {
            query.where.healthcare_name = healthcare_name;
        }
        if (department) {
            query.where.department = department;
        }
        const appointment = await appointments.findAll(query);
        if (!appointment.length) {
            return res.status(StatusCode.NOT_FOUND).json({ message: "No Appointment Log Found!", });
        }
        res.status(StatusCode.OK).json({
            appointments_details: appointment,
            fetched: appointment.length 
        });
    } catch (err) {
        console.log(err.message)
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message });
    }
};

// fetch healthcare infos for appoinments
const search_healthcare = async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const { healthcare_name, healthcare_id, state, country, city } = req.query;
    // check wheather the name parameter is present or not

    let query = {}
    if (healthcare_name) {
        query.healthcare_name = { [Op.iLike]: `%${healthcare_name}%` }
    }
    if (healthcare_id) {
        query.healthcare_id = { [Op.iLike]: `%${healthcare_id}%` }
    }
    if (state) {
        query.state = { [Op.iLike]: `%${state}%` }
    }
    if (country) {
        query.country = { [Op.iLike]: `%${country}%` }
    }
    if (city) {
        query.city = { [Op.iLike]: `%${city}%` }
    }

    try {
        let info = await healthcare_profile.findAll({
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
            where: query.length != 0 ? query : null,
            limit: limit
        });
        res.status(200).json({ healthcare: info, fetched: info.length });
    } catch (err) {
        console.error("Error fetching preferences:", err.message);
        res.status(500).json({ status: 'Could not process your request' });
    }
};

const GetHealthcareInfo = async (req, res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const { healthcare_id, healthcare_name } = req.query;
    const query = {}
    // check wheather the name parameter is present or not
    if (healthcare_id) {
        query.healthcare_id = healthcare_id
    }
    if (healthcare_name) {
        query.healthcare_name = healthcare_name
    }
    if (!healthcare_id && !healthcare_name) {
        res.status(StatusCode.NOT_ACCEPTABLE).json({ message: "healthcare_id or healthcare_name query parameter is required" });
        return;
    }
    try {
        let info = await healthcare_profile.findOne({
            attributes: [
                'healthcare_name',
                'healthcare_id',
                'healthcare_license',
                'country',
                'state',
                'city',
                'landmark',
                'date_of_registration',
                'email',
                'availability',
                'total_facilities',
                'total_mbbs_doc',
                'no_of_beds',
                'about',
            ],
            where: query,
            limit: limit != null ? limit : 10
        });
        res.status(200).json({ healthcare_profile: info });
    } catch (err) {
        console.error("Error fetching preferences:", err.message);
        res.status(500).json({ status: 'Could not process your request' });
    }
};

module.exports = {
    CreateAppointment,
    GetAppointment,

    search_healthcare,
    GetHealthcareInfo,
}