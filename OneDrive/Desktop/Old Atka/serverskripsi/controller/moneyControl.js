const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const stock = require('../models/').produkdetail;
const totalkas = require('../models/').tkas;
const kas = require('../models/').kas;

const totalAllProductKas = async(req, res) => {
    try {
        const result = await stock.findAll({
            attributes: ['totalprice'],
            where: {
                "statusBayar": "Dibayar ",
            }
        });

        const prices = await result.map(item => item.totalprice);
        let total = 0;
        for (let i = 0; i < prices.length; i++) {
            total += prices[i];
            console.log("loop success at increment", i);
        }

        await kas.create({
            tipe: "Produk",
            total: total
        })

        const totalK = await kas.findAll({
            attributes: ['total']
        })

        console.log(totalK)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const totalAllKas = async(req, res) => {
    try {
        console.log(kas);
        const result = await kas.findOne({
            order: [
                ['createdAt', 'DESC']
            ]
        })

        console.log(result.total);
        res.json("success");

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal server error' });
    }
}

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
    totalAllKas,
};