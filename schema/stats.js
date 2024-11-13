module.exports = (sequelize, DataTypes) => {
    return sequelize.define('client_stats', {
        health_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        account_status: {
            type: DataTypes.ENUM("Trial", "Testing", "Beta", "Premium"),
            allowNull: false,
            defaultValue: "Trial"
        },
        available_money: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "5000"
        },
        profile_viewed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        profile_updated: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        records_viewed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        records_created: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        timestamps: false
    });

}