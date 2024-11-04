module.exports = (sequelize, DataTypes) => {
    const setting = sequelize.define('healthuser_setting', {
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
            unique: true,
        }
    });
    return setting;
}