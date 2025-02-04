const sequelize = require("sequelize");
const stock = require('../models/').inventory;
const project = require('../models/').project;
const acc = require('../models/').account;
const accDetail = require("../models/").accountDetail
const idgenerator = require('generate-unique-id');
const jwt = require("jsonwebtoken");
const coa = require("../models/").coa

const getAllAccount = async(req, res) => {
    acc.hasMany(accDetail, { foreignKey: 'transactionId' });
    accDetail.belongsTo(acc, { foreignKey: 'transactionId' });
    try {
        const account = await acc.findAll({
            include: [{
                model: accDetail,
              }],
              order: [
                [accDetail, 'createdAt', 'DESC'] // Assuming 'createdAt' is a column in accDetail
            ],
        });
        res.send({account})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

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

const Pembuatantransaksi = async(req,res) => {
    const id = req.params.id
    const amount = req.body.amount
    const desc = req.body.deskripsi
    const user = req.cookies.token;
    const key = "ondsf0sgd3qirjg6"
    const decodedToken = jwt.verify(user, key);

    if(id == 1){
        await acc.create({
            name : "Pembayaran Beban",
            kredit : amount,
            deskripsi: desc
        })

        const idAcc = await acc.findOne({
            order: [
                ['createdAt', 'DESC'] // Specify the column and direction
              ]
        })

        await accDetail.create({
            transactionId : idAcc.id,
            coaId : 101,
            nominal : amount,
            userInputedId : decodedToken.id,
            userInputed : decodedToken.name,
            tipe : "Kredit"
        })

        await accDetail.create({
            transactionId : idAcc.id,
            coaId : 405,
            nominal : amount,
            userInputedId : decodedToken.id,
            userInputed : decodedToken.name,
            tipe : "Debit"
        })

        res.send("sukses")
    }

    else if(id == 2){
        await acc.create({
            name : "Pembuatan Utang",
            debit : amount,
            deskripsi: desc
        })

        const idAcc = await acc.findOne({
            order: [
                ['createdAt', 'DESC'] // Specify the column and direction
              ]
        })

        await accDetail.create({
            transactionId : idAcc.id,
            coaId : 202,
            nominal : amount,
            userInputedId : decodedToken.id,
            userInputed : decodedToken.name,
            tipe : "Kredit"
        })

        await accDetail.create({
            transactionId : idAcc.id,
            coaId : 101,
            nominal : amount,
            userInputedId : decodedToken.id,
            userInputed : decodedToken.name,
            tipe : "Debit"
        })
        res.send("sukses")
    }

    else if(id == 3){
        await acc.create({
            name : "Pembayaran Utang",
            kredit : amount,
            deskripsi: desc
        })

        const idAcc = await acc.findOne({
            order: [
                ['createdAt', 'DESC'] // Specify the column and direction
              ]
        })

        await accDetail.create({
            transactionId : idAcc.id,
            coaId : 101,
            nominal : amount,
            userInputedId : decodedToken.id,
            userInputed : decodedToken.name,
            tipe : "Kredit"
        })

        await accDetail.create({
            transactionId : idAcc.id,
            coaId : 202,
            nominal : amount,
            userInputedId : decodedToken.id,
            userInputed : decodedToken.name,
            tipe : "Debit"
        })
        res.send("sukses")
    }

    else if(id == 4){
        await acc.create({
            name : "Pembayaran Piutang",
            debit : amount,
            deskripsi: desc
        })

        const idAcc = await acc.findOne({
            order: [
                ['createdAt', 'DESC'] // Specify the column and direction
              ]
        })

        await accDetail.create({
            transactionId : idAcc.id,
            coaId : 304,
            nominal : amount,
            userInputedId : decodedToken.id,
            userInputed : decodedToken.name,
            tipe : "Kredit"
        })

        await accDetail.create({
            transactionId : idAcc.id,
            coaId : 101,
            nominal : amount,
            userInputedId : decodedToken.id,
            userInputed : decodedToken.name,
            tipe : "Debit"
        })
        res.send("sukses")
    }

    else if(id == 5){
        await acc.create({
            name : "Pembuatan Piutang",
            deskripsi: desc
        })

        const idAcc = await acc.findOne({
            order: [
                ['createdAt', 'DESC'] // Specify the column and direction
              ]
        })

        await accDetail.create({
            transactionId : idAcc.id,
            coaId : 101,
            nominal : amount,
            userInputedId : decodedToken.id,
            userInputed : decodedToken.name,
            tipe : "Kredit"
        })

        await accDetail.create({
            transactionId : idAcc.id,
            coaId : 304,
            nominal : amount,
            userInputedId : decodedToken.id,
            userInputed : decodedToken.name,
            tipe : "Debit"
        })
        res.send("sukses")
    }

    else if(id == 6){
        await acc.create({
            name : "Pendapatan Lain Lain",
            debit : amount,
            deskripsi: desc
        })

        const idAcc = await acc.findOne({
            order: [
                ['createdAt', 'DESC'] // Specify the column and direction
              ]
        })

        await accDetail.create({
            transactionId : idAcc.id,
            coaId : 302,
            nominal : amount,
            userInputedId : decodedToken.id,
            userInputed : decodedToken.name,
            tipe : "Kredit"
        })

        await accDetail.create({
            transactionId : idAcc.id,
            coaId : 101,
            nominal : amount,
            userInputedId : decodedToken.id,
            userInputed : decodedToken.name,
            tipe : "Debit"
        })
        res.send("sukses")
    }

}

const pembayaranBeban = async (req,res) => {

    const date = new Date()

    const amount = req.body.amount;

    const findid = await transaksi.findOne({
        attributes: ['id'],
        order: [
            ['createdAt', 'DESC']
        ]
    });


    res.send("OK")
}

const penyesuaianAsset = async (req,res) => {

    const date = new Date()

    const amount = req.body.amount;

    await transaksi.create({
        name: "",
        type: "Debit",
        amount: amount,
        description: "Pembayaran Beban Lain Lain",
        date: date
    })

    await transaksi.create({
        name: "Kas",
        type: "Kredit",
        amount: amount,
        description: "Pembayaran Beban Lain Lain",
        date: date
    })
}

const pembelianpenjualanlainlain = async (req,res) => {

    const date = new Date()

    const amount = req.body.amount;

    await transaksi.create({
        name: "",
        type: "Debit",
        amount: amount,
        description: "Pembayaran Beban Lain Lain",
        date: date
    })

    await transaksi.create({
        name: "Kas",
        type: "Kredit",
        amount: amount,
        description: "Pembayaran Beban Lain Lain",
        date: date
    })

}

const utangpiutang = async (req,res) => {
    try{
    const date = new Date()

    const amount = req.body.amount;
    const tipe = req.body.tipe;

    if(tipe === "utang"){
        
        await transaksi.create({
            name: "Kas",
            type: "Debit",
            amount: amount,
            description: "Pembayaran Beban Lain Lain",
            date: date
        })
    
        await transaksi.create({
            name: "Utang",
            type: "Kredit",
            amount: amount,
            description: "Pembayaran Beban Lain Lain",
            date: date
        })
        res.send("Sukses")
    }

    else if(tipe === "piutang"){

        await transaksi.create({
            name: "Piutang",
            type: "Debit",
            amount: amount,
            description: "Pembayaran Beban Lain Lain",
            date: date
        })
    
        await transaksi.create({
            name: "Keuntungan/Profit",
            type: "Kredit",
            amount: amount,
            description: "Pembayaran Beban Lain Lain",
            date: date
        })
        res.send("Sukses")
    }else{
        res.status(999).send("Tidak ada")
    }

    
}catch(err){
    res.status(500).send("Internal Server Error")
}
    
}

const retur = async (req,res) => {

    const date = new Date()

    const amount = req.body.amount;
    const namedebit = req.body.namedebit
    const namekredit = req.body.namekredit

    await transaksi.create({
        name: namedebit,
        type: "Debit",
        amount: amount,
        description: "Pembayaran Beban Lain Lain",
        date: date
    })

    await transaksi.create({
        name: namekredit,
        type: "Kredit",
        amount: amount,
        description: "Pembayaran Beban Lain Lain",
        date: date
    })

}

const getcoa = async (req,res) => {
    const coars = await coa.findAll();
    res.send(coars)
}

const getTransactionDetail = async(req,res) => {
    const rset = await accDetail.findAll()
    res.send(rset)
}

module.exports = {
    getAllAccount,
    getAllAccountByDate,
    pembayaranBeban,
    penyesuaianAsset,
    pembelianpenjualanlainlain,
    retur,
    utangpiutang,
    Pembuatantransaksi,
    getcoa,
    getTransactionDetail
};