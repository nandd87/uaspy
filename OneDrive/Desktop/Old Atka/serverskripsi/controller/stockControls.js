const sequelize = require("sequelize");
const stock = require('../models/').inventory;
const stockDetail = require("../models/").inventorydetail
const acc = require('../models/').account;
const accDetail = require("../models/").accountDetail
const categories = require('../models/').produkKategori
const project = require('../models/').project;
const coa = require('../models/').coadetail
const penunjang = require('../models/').penunjang
const idgenerator = require('generate-unique-id');
const jwt = require("jsonwebtoken");

const getStock = async(req, res) => {
    try {

        stock.hasMany(stockDetail, { foreignKey: 'stockId' });
        stockDetail.belongsTo(stock, { foreignKey: 'stockId' });

        const stocksWithDetails = await stock.findAll({
            include: [{
                model: stockDetail,
            }],
            order: [
                [stockDetail, 'createdAt', 'DESC'] // Assuming 'createdAt' is a column in accDetail
            ],
        });


        res.json(stocksWithDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPenunjang = async(req, res) => {
    try {
        const penunjangdata = await penunjang.findAll()
        res.json(penunjangdata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getStockDetail = async(req, res) => {
    try {
        const resultSet = await stockDetail.findAll({})
        res.json(resultSet)
    } catch (error) {
        console.error("Error fetching stocks by param:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getStockByParam = async(req, res) => {
    try {
        const idpar = req.params.id;

        const stock = await stock.findAll({
            where: { id: idpar }
        });

        res.send(stock);
    } catch (error) {
        console.error("Error fetching stocks by param:", error);
        res.status(500).send("Internal Server Error");
    }
};

const addPenunjang = async(req, res) => {
    const name = req.body.name
    const amount = req.body.amount
    const price = req.body.price

    try {
        await penunjang.create({
            name: name,
            amount: amount,
            price: price
        })
        res.send("OK")
    } catch (error) {
        console.error("Error fetching stocks by param:", error);
        res.status(500).send("Internal Server Error");
    }
}
const getAllStockByDate = async(req, res) => {
    const dateFirst = req.params.dateStart
    const dateLast = req.params.dateEnd
    try {
        const trans = stock.findall({
            where: {
                date: {
                    [Op.between]: [dateFirst, dateLast]
                }
            }
        })

        res.send(trans)

    } catch (error) {
        console.log(error)
        res.status(500).json({ json: 'Internal Server Error' })
    }
    const getAllAccountByDate = async(req, res) => {
        const dateFirst = req.params.dateStart
        const dateLast = req.params.dateEnd
        try {
            const trans = transaksi.findall({
                where: {
                    date: {
                        [Op.between]: [dateFirst, dateLast]
                    }
                }
            })

            res.send(trans)

        } catch (error) {
            console.log(error)
            res.status(500).json({ json: 'Internal Server Error' })
        }

    }

}

const addJenis = async(req, res) => {
    const jenis = req.body.jenis
    try {
        const date = new Date();
        await stock.create({
            name: jenis,
            date: date
        })
        res.send("ok")

    } catch (error) {
        res.status(500).send("internal server error")
    }
}

const addStock = async(req, res) => {

    try {
        const amount = req.body.amount;
        const description = req.body.description;
        const date = new Date();
        const type = req.body.type;
        const price = req.body.price;
        const totalPrice = price * amount
        const supplier = req.body.supplier
        const tipe = req.body.paymentMethod

        const result = await stock.findOne({
            where: {
                name: type // Assuming "type" is the value you want to match
            }
        });



        const idVal = result.id;

        const user = req.cookies.token;
        const key = "ondsf0sgd3qirjg6"
        const decodedToken = jwt.verify(user, key);
        const userValue = decodedToken.name;
        const userValue1 = decodedToken.id;

        console.log(userValue)

        await stockDetail.create({
            stockId: result.id,
            userInputed: decodedToken.name,
            price: price,
            amount: amount,
            userInputedId: decodedToken.id,
            supplier: supplier,
            tipepembayaran: tipe,
        })

        const findidDetail = await stockDetail.findOne({
            attributes: ['id'],
            order: [
                ['createdAt', 'DESC']
            ]
        });
        const idVal2 = findidDetail.id

        await acc.create({
            name: "Pembelian Stok",
            kredit: totalPrice,
            deskripsi: description,
        })

        const idAcc = await acc.findOne({
            order: [
                ['createdAt', 'DESC'] // Specify the column and direction
            ]
        })

        await accDetail.create({
            transactionId: idAcc.id,
            coaId: 102,
            nominal: totalPrice,
            userInputedId: decodedToken.id,
            userInputed: decodedToken.name,
            tipe: "Debit"
        })

        await accDetail.create({
            transactionId: idAcc.id,
            coaId: 101,
            nominal: totalPrice,
            userInputedId: decodedToken.id,
            userInputed: decodedToken.name,
            tipe: "Kredit"
        })

        const findidDetail2 = await stockDetail.findOne({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        const idAcc2 = await acc.findOne({
            order: [
                ['createdAt', 'DESC'] // Specify the column and direction
            ]
        })

        const updateIdval = idAcc2.id;
        const inventoryIdval = findidDetail2.id;
        console.log(updateIdval)

        await stockDetail.update({
            transactionId: updateIdval
        }, {
            where: {
                id: inventoryIdval
            }
        })

        .then((createdStock) => {
            console.log('Stock created:', createdStock);
            res.status(201).json(createdStock);
        })


    } catch (error) {
        console.error("Error adding stock:", error);
        res.status(500).send("Internal Server Error");
    }
};

const retour = async(req, res) => {
    const id = req.body.id;
    const quantity = req.body.quantity;
    const user = req.cookies.token;
    const key = "ondsf0sgd3qirjg6"
    const decodedToken = jwt.verify(user, key);
    const userValue = decodedToken.name;
    const userValue1 = decodedToken.id;

    const quantityreq = await stockDetail.findOne({ where: { id: id } })

    const finalquantity = quantityreq.dataValues.amount - quantity;

    await stockDetail.update({
        amount: finalquantity,
    }, {
        where: {
            id: id
        }
    })

    const findStock = await stockDetail.findOne({
        where: {
            id: id
        }
    })

    const harga = findStock.price
    const finalharga = harga * quantity

    const date = new Date();

    const findid = await acc.findOne({
        attributes: ['id'],
        order: [
            ['createdAt', 'DESC']
        ]
    });

    const idVal = findid.id

    await acc.create({
        name: "Penyesuaian Stok",
        debit: finalharga,
    })

    const idAcc = await acc.findOne({
        order: [
            ['createdAt', 'DESC'] // Specify the column and direction
        ]
    })

    await accDetail.create({
        transactionId: idAcc.id,
        coaId: 102,
        nominal: finalharga,
        userInputedId: decodedToken.id,
        userInputed: decodedToken.name,
        tipe: "Kredit"
    })

    await accDetail.create({
        transactionId: idAcc.id,
        coaId: 101,
        nominal: finalharga,
        userInputedId: decodedToken.id,
        userInputed: decodedToken.name,
        tipe: "Debit"
    })

    res.send("OK")
}
const tes123 = async(req, res) => {
    const user = req.cookies.token;
    const key = "ondsf0sgd3qirjg6"
    const decodedToken = jwt.verify(user, key);
    const userValue = decodedToken.user;

    console.log(userValue)
    res.send("OK")
}




module.exports = {
    getStock,
    getStockByParam,
    addStock,
    retour,
    addJenis,
    tes123,
    getStockDetail,
    getPenunjang,
    addPenunjang
};