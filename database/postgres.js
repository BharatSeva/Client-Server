const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize('postgres', process.env.POSTGRES_USER, process.env.POSTGRES_PASS, {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT,
    port: process.env.POSTGRES_PORT,
    logging: false
});

const connectopostgres = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to Postgres');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
};

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


// take all the schemas
db.pref = require("../schema/setting.js")(sequelize, DataTypes);
db.stats = require("../schema/stats.js")(sequelize, DataTypes);
db.appoint_info = require("../schema/appoint_info.js")(sequelize, DataTypes);



db.sequelize.sync({ force: false })
    .then(() => console.log("Sync Successful"))

module.exports = {
    db,
    connectopostgres
};
