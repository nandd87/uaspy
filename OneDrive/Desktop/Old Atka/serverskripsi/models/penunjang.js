const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const penunjang = sequelize.define("penunjang", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING, // Corrected data type to STRING
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    return penunjang;
};