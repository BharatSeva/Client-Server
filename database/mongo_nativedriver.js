// THIS FILE IS NATIVE FOR MONGODB
// This will fetch records without any schema definition :) :)

require('dotenv').config()
const { MongoClient } = require('mongodb');
const uri = process.env.MONGOURL_USER;
const client = new MongoClient(uri);
 
(async () => {
    try {
        await client.connect();
        console.log('Connected With MongoDB');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
})();

module.exports = client
