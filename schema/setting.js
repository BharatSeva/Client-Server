module.exports = (sequelize, DataTypes) => {
    return sequelize.define('client_setting', {
        health_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        view_permission: {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
            defaultValue: true
        },
        locked_account: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        email: {
            type: DataTypes.ENUM("Every Event", "Weekly", "Opt Out", "Monthly"),
            allowNull: false,
        }
    }, {
        tableName: 'client_setting',
        timestamps: false,
    });
}