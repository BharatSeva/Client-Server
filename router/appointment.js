const express = require("express")
const router = express.Router()

const {
    GetAppointment,
    CreateAppointment,
    appointment_info,
    GetHealthcareInfo
} = require("../controller/appointment")


router.post('/appointment/create', CreateAppointment)
router.get('/appointment/fetch', GetAppointment)
router.get('/appointment/healthcare', appointment_info)
router.get('/appointment/healthcare/search', GetHealthcareInfo)

module.exports = router