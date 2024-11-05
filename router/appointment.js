const express = require("express")
const router = express.Router()

const {
    GetAppointment,
    CreateAppointment,
    appointment_info
} = require("../controller/appointment")


router.post('/appointment/create', CreateAppointment)
router.get('/appointment/fetch', GetAppointment)
router.get('/appointment/healthcare', appointment_info)



module.exports = router