const express = require("express")
const router = express.Router()

const {
    getissue,
    getinfo
} = require("../controller/patient_services")


router.get('/issue', getissue)
router.get('/info', getinfo)



module.exports = router