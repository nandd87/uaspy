const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const stock = require('../models/').produkdetail;
const kas = require('../models/kas').kas;
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const totalAllProductKas = async(req, res) => {
    try {
        const result = await stock.findAll({
            attributes: ['price'],
            where: {
                "statusBayar": "Dibayar",
            }
        });

        console.log(result);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const totalAllProductUtang = async(req, res) => {
    try {
        const result = await stock.findAll({
            attributes: ['price', ],
            where: {
                "statusBayar": "Utang",
            }
        });

        console.log(result);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    totalAllProductKas,
    totalAllProductUtang,
};