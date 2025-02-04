const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("project", {
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        recipient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        userInputed: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        userInputedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        totalitemprice: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },

        stock: {
            type: DataTypes.JSON,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        bahanpenunjang: {
            type: DataTypes.JSON,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        date_ongoing: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        date_finished: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        date_paid: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });

    return Project;
};