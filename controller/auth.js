const StatusCode = require("http-status-codes");
const { db } = require("../database/postgres")
const PatientAuth = require("../schema/auth")
const ClientProfile = db.profile;
const { channel } = require("../rabbitmq/connect");

const register = async (req, res) => {
    try {
        let { health_id, email } = req.body;
        const FindUser = await ClientProfile.findOne({
            where: { health_id, email },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        if (!FindUser) {
            return res.status(StatusCode.BAD_REQUEST).json({
                status: "No User Found With Given Health ID",
                message: "HealthCare Need To Register You Before You Login.."
            });
        }

        const QUEUE_NAME = 'logs';
        const msgChannel = channel();
        if (!msgChannel) {
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "RabbitMQ channel is not available." });
        }

        const payload = {
            email: email,
            health_id: health_id,
            category: "patientRegister",
            IP_ADDR: req.ip
        };
        msgChannel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(payload)), { persistent: true });

        // Check if user already exists in PatientAuth
        const IsUser = await PatientAuth.findOne({ where: { health_id } });
        if (IsUser) {
            return res.status(StatusCode.CONFLICT).json({ status: "User Already Registered!" });
        }

        req.body.fullname = `${FindUser.first_name} ${FindUser.middle_name} ${FindUser.last_name}`;

        if (FindUser.email === req.body.email) {
            // Create new patient in PatientAuth
            await PatientAuth.create(req.body);
            return res.status(StatusCode.CREATED).json({
                status: "Successfully Registered, Now You Can Login..."
            });
        } else {
            return res.status(StatusCode.BAD_REQUEST).json({
                status: "Email Mismatched",
                message: "Use the same email address that you provided for HealthCare registration"
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ status: "Something Bad Happened!" });
    }
};

const login = async (req, res) => {
    try {  
        const { health_id, password } = req.body;

        const Patient = await PatientAuth.findOne({ where: { health_id } });
        if (!Patient) {
            return res.status(StatusCode.BAD_REQUEST).json({ message: "No User Exits with Given Credentials" });
        }

        // store client fullname and email for further request
        // req.user = {}
        // req.user.fullname = Patient.fullname;
        // req.user.email = Patient.email;
        // req.user.health_id = health_id;


        // Push login event to RabbitMQ queue
        const QUEUE_NAME = 'logs';
        const msgChannel = channel();
        if (!msgChannel) {
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "RabbitMQ channel is not available." });
        }

        const payload = {
            health_id: health_id,
            email: Patient.email,
            category: "patientLogin",
            fullname: Patient.fullname,
            IP_ADDR: req.ip
        };
        msgChannel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(payload)), { persistent: true });

        // Compare password
        const IspasswordCorrect = await Patient.P_comparePass(password);
        if (!IspasswordCorrect) {
            return res.status(StatusCode.BAD_REQUEST).json({ message: "Incorrect Password!" });
        }
        // Generate JWT token
        const token = Patient.P_createJWT();
        return res.status(StatusCode.ACCEPTED).json({
            fullname: Patient.fullname,
            health_id: Patient.health_id,
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
};

module.exports = {
    register,
    login
};
