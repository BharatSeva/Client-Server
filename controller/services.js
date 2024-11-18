const StatusCode = require('http-status-codes')
const { db } = require("../database/postgres")
const profile = db.profile

// const issue = require("../schema/records")
const { Setcaching, Getcaching } = require("../redis/services")

const getprofile = async (req, res) => {
    let cache = req.query.cache === 'false' ? false : true;
    const { health_id } = req.user;
    try {
        if (cache) {
            const { cachedData, ttl } = await Getcaching('client_profile', health_id)
            if (cachedData) {
                res.status(StatusCode.OK).json({ profile_data: cachedData, refreshIn: ttl + "s" })
                return
            }
        }
        let query = { health_id };
        const clientprofile = await profile.findOne({ where: query })
        // set cache data
        await Setcaching('client_profile', health_id, clientprofile)

        res.status(StatusCode.OK).json({ profile_data: clientprofile })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Something Went Wrong!" })
        console.log(error.message)
    }
}

const Get_Records = async (req, res) => {
    const validSeverity = ["Low", "Moderate", "High", "Severe"];
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const { health_id } = req.user;
    let { severity, healthcare_name } = req.query;

    try {
        let query = { health_id };
        if (severity && validSeverity.includes(severity)) {
            query.medical_severity = severity;
        } else {
            severity = "N/A"
        }
        if (healthcare_name) {
            query.healthcare_name = healthcare_name
        }

        // No Need to use schema here, just fetching records using collection name, 
        // Mongoose native driver name
        ////////////////
        const collectionName = "patient_records"
        const collection = mongoose.connection.collection(collectionName);
        const records = await collection.find(query, { projection: { _id: 0 } }).limit(limit).toArray();
        res.status(StatusCode.OK).json({ records: records, fetched: records.length, severity: severity })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}

// fetch with mongoose without schema
const mongoose = require('mongoose');
const dbName = 'logs';
const viewed_records = async (req, res) => {
    try {
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const { health_id } = req.user
        let query = { health_id }

        let { healthcare_name } = req.query;
        if (healthcare_name) {
            query.healthcare_name = healthcare_name
        }

        // specify the db to use - without specifying in url parameters
        // specify the collection to use
        const collectionName = 'records_viewed';
        const db = mongoose.connection.useDb(dbName);
        const collection = db.collection(collectionName);
        const records = await collection.find(query).limit(limit).toArray();
        res.status(StatusCode.OK).json({ viewed_records: records, fetched: records.length })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}
const created_records = async (req, res) => {
    try {
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const { health_id } = req.user
        const query = { health_id };

        let { healthcare_name } = req.query;
        if (healthcare_name) {
            query.healthcare_name = healthcare_name
        }


        const collectionName = 'records_created';
        const db = mongoose.connection.useDb(dbName);
        const collection = db.collection(collectionName);
        const records = await collection.find(query).limit(limit).toArray();
        res.status(StatusCode.OK).json({ records_created: records, fetched: records.length })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}
const profile_updated = async (req, res) => {
    try {
        let limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const { health_id } = req.user
        const query = { health_id };
        let { healthcare_name } = req.query;
        if (healthcare_name) {
            query.healthcare_name = healthcare_name
        }

        const collectionName = 'profile_updated';
        const db = mongoose.connection.useDb(dbName);
        const collection = db.collection(collectionName);
        const records = await collection.find(query).limit(limit).toArray();
        res.status(StatusCode.OK).json({ profile_updated: records, fetched: records.length })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}
const profile_viewed = async (req, res) => {
    try {
        let limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const { health_id } = req.user
        const query = { health_id };
        let { healthcare_name } = req.query;
        if (healthcare_name) {
            query.healthcare_name = healthcare_name
        }

        const collectionName = 'profile_viewed';
        const db = mongoose.connection.useDb(dbName);
        const collection = db.collection(collectionName);
        const records = await collection.find(query).limit(limit).toArray();
        res.status(StatusCode.OK).json({ profile_viewed: records, fetched: records.length })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}

module.exports = {
    getprofile,
    Get_Records,
    viewed_records,
    created_records,
    profile_updated,
    profile_viewed
}
