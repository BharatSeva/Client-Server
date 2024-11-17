module.exports = (sequelize, DataTypes) => {
    return sequelize.define('client_profile', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        health_id: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        middle_name: {
            type: DataTypes.STRING(150),
            allowNull: true // Optional field
        },
        last_name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        sex: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        healthcare_id: {
            type: DataTypes.STRING(150), // Adjusted to STRING(150) based on schema
            allowNull: false
        },
        dob: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        blood_group: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        bmi: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        marriage_status: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        weight: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            // validate: {
            //     isEmail: true // Ensure valid email format
            // }
        },
        mobile_number: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        aadhaar_number: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        primary_location: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        sibling: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        twin: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        father_name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        mother_name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        emergency_number: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'updated_at'  // Ensures Sequelize uses "updated_at" instead of "updatedAt"
        },
        country: {
            type: DataTypes.STRING(150), 
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        landmark: {
            type: DataTypes.STRING(150),
            allowNull: false
        } 
    }, {
        tableName: 'client_profile' 
    });
};
