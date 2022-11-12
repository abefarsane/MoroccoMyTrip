const { INTEGER } = require("sequelize")

module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        pwd: {
            type: DataTypes.STRING(500),
            allowNull: false
        }
    })

    return Users
}