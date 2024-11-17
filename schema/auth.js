const { DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { db } = require("../database/postgres")
const sequelize = db.sequelize

const ClientAuth = sequelize.define('clientAuth', {
    fullname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [3, 200]
        }
    },
    email: { 
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            len: [1, 50]
        }
    },  
    health_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            len: [1, 50]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 255]
        }
    }
}, {
    timestamps: true,
    tableName: 'clientAuth'
});

ClientAuth.addHook('beforeCreate', async (user) => {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(String(user.password), salt);
});


ClientAuth.prototype.P_createJWT = function () {
    return jwt.sign(
        { Patient_USERID: this.id, fullname: this.fullname, healthId: this.health_id, email: this.email },
        process.env.Patient_JWT_SECRET_KEY,
        {
            expiresIn: process.env.Patient_JWT_LIFETIME,
        }
    );
};

ClientAuth.prototype.P_comparePass = async function (password) {
    const isMatch = await bcryptjs.compare(password, this.password);
    return isMatch;
};

module.exports = ClientAuth;
