const StatusCode = require("http-status-codes")
const auth = require("../schema/auth")
const info = require("../schema/info")

// const { GetHealthUserSettingForServer, HealthUserLoginData } = require("../Firebase/Service")
// const pref = require("../database/postgres").pref

const register = async (req, res) => {
    try {
        let { health_id } = req.body
        const FindUser = await info.findOne({ health_id })
        if (!FindUser) {
            res.status(StatusCode.BAD_REQUEST).json({ status: "No User Found With Given Health ID", message: "HealthCare Need To Register You Before You Login.." })
            return;
        }
        // await new pref();

        const IsUser = await auth.findOne({ health_id })
        if (IsUser) {
            res.status(StatusCode.BAD_REQUEST).json({ status: "User Already Registered!" })
            return
        } 
       

        req.body.name = FindUser.fname + " " + FindUser.lname;
        if (FindUser.email === req.body.email) {
            await auth.create(req.body)
            res.status(StatusCode.CREATED).json({ status: "Successfully Registered, Now You Can Login..." })
            // UserRegister(req.body.name, FindUser.health_id, FindUser.email)
        } else {
            res.status(StatusCode.BAD_REQUEST).json({ status: "Email Mismatched", message: "Use the same email address that you provided for HealthCare registration" })
        }

    } catch (err) {
        console.log(err)

        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ status: "Something Bad Happened!" })
    }
}

const login = async (req, res) => {
    try {
        const { health_id, password } = req.body
        const Patient = await auth.findOne({ health_id })
        if (!Patient) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "No User Exits with Given Credentials" })
            return;
        }

        // const IsAccountSuspended = await GetHealthUserSettingForServer(health_id.toString())
        // if (!IsAccountSuspended.Account_Connection || !IsAccountSuspended.Total_request) {
        //     res.status(StatusCode.NOT_ACCEPTABLE).json({ status: "Account Suspended!", message: "You Have Used all your 50 operations!, Please Mail to 21vaibhav11@gmail.com to extend the limit" })
        //     return
        // }

        const IspasswordCorrect = await Patient.P_comparePass(password)
        if (!IspasswordCorrect) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "Incorrect Password!" })
            return;
        }

        const token = Patient.P_createJWT();
        // await HealthUserLoginData(Patient.health_id, req.ip.toString())

        res.status(StatusCode.ACCEPTED).json({
            name: Patient.name,
            healthId: Patient.health_id,
            token
        })
        // LoginDetected(Patient.name, Patient.health_id, req.ip, Patient.email)
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}



module.exports = {
    register,
    login
}