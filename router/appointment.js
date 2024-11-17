const express = require("express")
const router = express.Router()

const {
    GetAppointment,
    CreateAppointment,
    search_healthcare,
    GetHealthcareInfo
} = require("../controller/appointment")


router.post('/appointment', CreateAppointment)
router.get('/appointment', GetAppointment)
router.get('/appointment/healthcare/search', search_healthcare)
router.get('/appointment/healthcare/profile', GetHealthcareInfo)

module.exports = router