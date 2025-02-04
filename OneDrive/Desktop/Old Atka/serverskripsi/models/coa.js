const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const coa = sequelize.define("coa", {
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
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return coa;
};
