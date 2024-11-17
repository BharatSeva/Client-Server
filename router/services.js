const express = require("express")
const router = express.Router()

const { Get_Records, getprofile, viewed_records, created_records, profile_updated, profile_viewed } = require("../controller/services")
router.get('/profile', getprofile)
router.get('/records', Get_Records)

// fetch logs
router.get('/logs/records/viewed', viewed_records)
router.get('/logs/records/created', created_records)
router.get('/logs/profile/updated', profile_updated)
router.get('/logs/profile/viewed', profile_viewed)


const { get_pref, update_pref, stat } = require("../controller/preferances")
router.get('/preferences', get_pref)
router.patch('/preferences/update', update_pref)
router.get('/stats', stat)

module.exports = router