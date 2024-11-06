const StatusCode = require('http-status-codes')
const info = require("../schema/info")
const issue = require("../schema/records")
const { Setcaching, Getcaching } = require("../redis/services")

const getinfo = async (req, res) => {
    let cache = req.query.cache === 'false' ? false : true;
    const { health_id } = req.user;
    try {
        if (cache) {
            const { cachedData, ttl } = await Getcaching('info', health_id)
            if (cachedData) {
                res.status(StatusCode.OK).json({ biodata: cachedData, status: "cache hit", refreshIn: ttl })
                return
            }
        }
        const BioData = await info.findOne({ health_id }).select(["-__v", "-_id"])
        // set cache data
        await Setcaching('info', health_id, BioData)
        
        res.status(StatusCode.OK).json({ BioData })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Something Went Wrong!" })
        console.log(error.message)
    }
}

const getissue = async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    try {
        const { health_id } = req.user
        const records = await issue.find({ health_id }).select(["-__v", "-_id"])
            .sort("created_At")
            .limit(limit)
        res.status(StatusCode.OK).json({ issues: records, issues_fetched: records.length })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}

// fetch with native mongodriver
const { records_viewed, records_created, biodata_created, biodata_viewed } = require("../utility/logs")
const viewed_records = async (req, res) => {
    try {
        let limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const { health_id } = req.user
        const records = await records_viewed(health_id, limit)
        res.status(StatusCode.OK).json({ viewed_records: records, fetched: records.length })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}
const created_records = async (req, res) => {
    try {
        let limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const { health_id } = req.user
        const records = await records_created(health_id, limit)
        res.status(StatusCode.OK).json({ records_created: records, fetched: records.length })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}
const created_biodata = async (req, res) => {
    try {
        let limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const { health_id } = req.user
        const records = await biodata_created(health_id, limit)
        res.status(StatusCode.OK).json({ created_biodata: records, fetched: records.length })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}
const viewed_biodata = async (req, res) => {
    try {
        let limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const { health_id } = req.user
        const records = await biodata_viewed(health_id, limit)
        res.status(StatusCode.OK).json({ viewed_biodata: records, fetched: records.length })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}




module.exports = {
    getinfo,
    getissue,
    viewed_records,
    created_records,
    created_biodata,
    viewed_biodata
}
