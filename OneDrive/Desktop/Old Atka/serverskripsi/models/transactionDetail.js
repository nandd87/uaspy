const { DataTypes } = require("sequelize");
const Inventory = require("../models").Inventory;

module.exports = (sequelize) => {
    const Account = sequelize.define("accountDetail", {

        transactionId:{
            type: DataTypes.INTEGER,
            allowNull:false
        },

        coaId:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        nominal: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userInputedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userInputed: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        tipe: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });


    return Account;
};