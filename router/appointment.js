const express = require("express")
const router = express.Router()

const {
    GetAppointment,
    CreateAppointment
} = require("../controller/appointment")


router.post('/appointment/create', CreateAppointment)
router.get('/appointment/fetch', GetAppointment)



module.exports = router