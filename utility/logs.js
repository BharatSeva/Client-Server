// Here fetch records without using schema so directly calling mongoose
const mongoose = require('mongoose');
const records_viewed = async (health_id, limit) => {
    try {
        const query = { health_id };
        const dbName = 'logs';
        const collectionName = 'records_viewed';

        // specify the db to use - without specifying in url parameters
        const db = mongoose.connection.useDb(dbName);
        // specify the collection to use
        const collection = db.collection(collectionName);
        return await collection.find(query).limit(limit).toArray();
    } catch (error) {
        console.error('Error fetching records_viewed:', error);
        return { viewed_records: [], fetched: 0 };
    }
};
const records_created = async (health_id, limit) => {
    try {
        const dbName = 'logs';
        const collectionName = 'records_created';
        const db = mongoose.connection.useDb(dbName);
        const collection = db.collection(collectionName);
        const query = { health_id };
        return await collection.find(query).limit(limit).toArray();
    } catch (error) {
        console.error('Error fetching records_created:', error);
        return error;
    }
}
const biodata_created = async (health_id, limit) => {
    try {
        const dbName = 'logs';
        const collectionName = 'profile_updated';
        const db = mongoose.connection.useDb(dbName);
        const collection = db.collection(collectionName);
        const query = { health_id };
        return await collection.find(query).limit(limit).toArray();
    } catch (error) {
        console.error('Error fetching profile_updated:', error);
        return error;
    }
}
const biodata_viewed = async (health_id, limit) => {
    try {
        const dbName = 'logs';
        const collectionName = 'profile_viewed';
        const db = mongoose.connection.useDb(dbName);
        const collection = db.collection(collectionName);
        const query = { health_id };
        return await collection.find(query).limit(limit).toArray();
    } catch (error) {
        console.error('Error fetching profile_viewed:', error);
        return error;
    }
}

module.exports = {
    records_viewed,
    records_created,

    biodata_created,
    biodata_viewed
}