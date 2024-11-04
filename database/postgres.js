const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize('postgres', 'rootuser', 'rootuser', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to POSTGRES has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
})();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.pref = require("../schema/setting.js")(sequelize, DataTypes);
db.stats = require("../schema/stats.js")(sequelize, DataTypes);
// db.loans = require("../models/loans.js")(sequelize, DataTypes);



db.sequelize.sync({ force: false })
    .then(() => console.log("Sync Successful"))

module.exports = db;
