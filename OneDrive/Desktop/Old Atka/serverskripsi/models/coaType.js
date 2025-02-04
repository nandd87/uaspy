const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const coaDetail = sequelize.define("coaDetail", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING, // Adjusted data type to STRING
            allowNull: false
        }
    });

    return coaDetail;
};
