const express = require("express")
const router = express.Router()

const { Get_Records, getinfo, viewed_records, created_records, created_biodata, viewed_biodata } = require("../controller/services")
router.get('/info', getinfo)
router.get('/issue', Get_Records)
// fetch logs
router.get('/logs/records/viewed', viewed_records)
router.get('/logs/records/created', created_records)
router.get('/logs/info/created', created_biodata)
router.get('/logs/info/viewed', viewed_biodata)



const { get_pref, update_pref, stat } = require("../controller/preferances")
router.get('/pref/get', get_pref)
router.patch('/pref/update', update_pref)
router.get('/stats', stat)

module.exports = router