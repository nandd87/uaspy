const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const categories = sequelize.define("produkKategori", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        jenis: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    return categories;
};
