module.exports = (sequelize, DataTypes) => {
    return sequelize.define('appointments', {
        health_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Pending', 'Confirmed', 'Rejected', 'Not Available']]
            }
        },
        appointment_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        appointment_time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        healthcare_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        }, 
        department: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        note: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 500]
            }
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        healthcare_name: { 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        }
    }, {
        timestamps: true,
        tableName: 'appointments',
        underscored: true,
    });
};
