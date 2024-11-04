const express = require("express")
const router = express.Router()

const { getissue, getinfo } = require("../controller/patient_services")
router.get('/info', getinfo)
router.get('/issue', getissue)



const { get_pref, update_pref } = require("../controller/preferances")
router.get('/pref/get', get_pref)
router.patch('/pref/update', update_pref)


const { stat } = require("../controller/stats")
router.get('/stats', stat)

module.exports = router