module.exports = (sequelize, DataTypes) => {
    return sequelize.define('hip_table', {
        healthcare_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        healthcare_license: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        healthcare_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        availability: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        total_facilities: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total_mbbs_doc: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total_worker: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        no_of_beds: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date_of_registration: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        // password: {
        //     type: DataTypes.TEXT,
        //     allowNull: false,
        // },
        about: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        landmark: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    }, {
        tableName: 'hip_table',
        timestamps: false,
    });
};
