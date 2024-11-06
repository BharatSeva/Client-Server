const client = require("../database/mongo_nativedriver")

const records_viewed = async (health_id, limit) => {
    try {
        const dbName = 'logs';
        const collectionName = 'recordViewed';
        const collection = client.db(dbName).collection(collectionName);
        const query = { health_id };
        return await collection.find(query).limit(limit).toArray();
    } catch (error) {
        console.error('Error fetching records_viewed:', error);
        return error;
    }
}
const records_created = async (health_id, limit) => {
    try {
        const dbName = 'logs';
        const collectionName = 'recordCreated';
        const collection = client.db(dbName).collection(collectionName);
        const query = { health_id };
        return await collection.find(query).limit(limit).toArray();
    } catch (error) {
        console.error('Error fetching records_viewed:', error);
        return error;
    }
}
const biodata_created = async (health_id, limit) => {
    try {
        const dbName = 'logs';
        const collectionName = 'biodataUpdated';
        const collection = client.db(dbName).collection(collectionName);
        const query = { health_id };
        return await collection.find(query).limit(limit).toArray();
    } catch (error) {
        console.error('Error fetching records_viewed:', error);
        return error;
    }
}
const biodata_viewed = async (health_id, limit) => {
    try {
        const dbName = 'logs';
        const collectionName = 'biodataViewed';
        const collection = client.db(dbName).collection(collectionName);
        const query = { health_id };
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