const { DataTypes } = require("sequelize");
const Inventory = require("../models").Inventory;

module.exports = (sequelize) => {
    const Account = sequelize.define("account", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        debit: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        kredit: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        deskripsi: {
            type: DataTypes.STRING,
            allowNull: true
        },

    });

    return Account;
};