const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const InventoryDetail = sequelize.define("inventorydetail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },


        typeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },

        stockId: {
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

        userInputedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        transactionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },

        supplier: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },

        tipepembayaran: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
    });


    return InventoryDetail;
};