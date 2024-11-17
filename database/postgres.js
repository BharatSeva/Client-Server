const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()
// Adding connection pool to server
// max of 7 and min of 2, idle of 30000 seconds
const sequelize = new Sequelize('postgres', process.env.POSTGRES_USER, process.env.POSTGRES_PASS, {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT,
    port: process.env.POSTGRES_PORT,
    logging: false,
    pool: {
        max: 10,
        min: 2,
        acquire: 30000,
        idle: 30000,
    }
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
db.healthcare_profile = require("../schema/healthcare_info.js")(sequelize, DataTypes);
db.appointments = require("../schema/appointments.js")(sequelize, DataTypes);
db.profile = require("../schema/profile.js")(sequelize, DataTypes);



db.sequelize.sync({ force: false })
    .then(() => console.log("Sync Successful"))

module.exports = {
    db,
    connectopostgres
};
