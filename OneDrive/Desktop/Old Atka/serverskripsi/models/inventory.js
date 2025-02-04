const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Inventory = sequelize.define("inventory", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },


        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },


    });


    return Inventory;
};