const StatusCode = require('http-status-codes')
const info = require("../schema/info")
const issue = require("../schema/records")




const getinfo = async (req, res) => {
    try {
        const { health_id } = req.user;
        const BioData = await info.findOne({ health_id }).select(["-__v", "-_id"])
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

// const 

module.exports = {
    getinfo,
    getissue
}
