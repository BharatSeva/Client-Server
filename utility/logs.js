const client = require("../database/mongo_nativedriver")

const records_viewed = async (healthId, limit) => {
    try {
        const dbName = 'hip_logs';
        const collectionName = 'patient_record_viewed';
        const collection = client.db(dbName).collection(collectionName);
        const query = { healthId };
        return await collection.find(query).limit(limit).toArray();
    } catch (error) {
        console.error('Error fetching records_viewed:', error);
        return error;
    }
}
const records_created = async (healthId, limit) => {
    try {
        const dbName = 'hip_logs';
        const collectionName = 'patient_record_created';
        const collection = client.db(dbName).collection(collectionName);
        const query = { healthId };
        return await collection.find(query).limit(limit).toArray();
    } catch (error) {
        console.error('Error fetching records_viewed:', error);
        return error;
    }
}
const biodata_created = async (healthId, limit) => {
    try {
        const dbName = 'hip_logs';
        const collectionName = 'patient_biodata_created';
        const collection = client.db(dbName).collection(collectionName);
        const query = { healthId };
        return await collection.find(query).limit(limit).toArray();
    } catch (error) {
        console.error('Error fetching records_viewed:', error);
        return error;
    }
}
const biodata_viewed = async (healthId, limit) => {
    try {
        const dbName = 'hip_logs';
        const collectionName = 'patient_biodata_viewed';
        const collection = client.db(dbName).collection(collectionName);
        const query = { healthId };
        return await collection.find(query).limit(limit).toArray();
    } catch (error) {
        console.error('Error fetching records_viewed:', error);
        return error;
    }
}

module.exports = {
    records_viewed,
    records_created,

    biodata_created,
    biodata_viewed
}