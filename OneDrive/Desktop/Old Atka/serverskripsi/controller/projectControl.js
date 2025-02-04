const sequelize = require("sequelize");
const stockNonDetail = require('../models/').inventory;
const stockDetail = require('../models/').inventorydetail
const acc = require('../models/').account;
const project = require('../models/').project;
const idgenerator = require('generate-unique-id');
const accDetail = require('../models/').accountDetail
const jwt = require("jsonwebtoken");

const getProject = async(req, res) => {
    try {
        const allproject = await project.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
        res.send(allproject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProjectByParam = async(req, res) => {
    try {
        const idpar = req.params.id;

        const proj = await project.findAll({
            where: { id: idpar }
        });

        res.send(proj);
    } catch (error) {
        console.error("Error fetching stocks by param:", error);
        res.status(500).send("Internal Server Error");
    }
};

const projectgantistatusiyes = async(req, res) => {
    try {
        const idProj = req.params.id
        const date = new Date()
        const user = req.cookies.token;
        const key = "ondsf0sgd3qirjg6"
        const decodedToken = jwt.verify(user, key);

        const projectPointer = await project.findOne({
            where: { id: idProj }
        })

        if (projectPointer.status == "Dimulai") {
            await project.update({
                status: "Finished",
                date_finished: date,
            }, {
                where: {
                    id: idProj
                }
            })
            res.send("Project Sudah Selesai!")
        } else if (projectPointer.status == "Finished") {
            await project.update({
                status: "Paid",
                date_paid: date,
            }, {
                where: {
                    id: idProj
                }
            })

            await acc.create({
                name: projectPointer.nama,
                debit: projectPointer.price,
                deskripsi: "Pembayaran Projek",
            })

            const idAcc = await acc.findOne({
                order: [
                    ['createdAt', 'DESC'] // Specify the column and direction
                ]
            })

            await accDetail.create({
                transactionId: idAcc.id,
                coaId: 101,
                nominal: projectPointer.price,
                userInputedId: decodedToken.id,
                userInputed: decodedToken.name,
                tipe: "Debit"
            })

            await accDetail.create({
                transactionId: idAcc.id,
                coaId: 304,
                nominal: projectPointer.price,
                userInputedId: decodedToken.id,
                userInputed: decodedToken.name,
                tipe: "Kredit"
            })

            res.send("Project Sudah Dibayar!")


        }



    } catch (error) {
        res.status(500).send(error)
    }
}

const addProject = async(req, res) => {

    try {
        const { nama, desc, pemesan, price, stock, bahanpenunjang } = req.body;
        const status = "Dimulai";
        const date = new Date();
        const user = req.cookies.token;
        const key = "ondsf0sgd3qirjg6"
        const decodedToken = jwt.verify(user, key);
        let totalPrice = 0

        const projectData = {
            nama: nama,
            description: desc,
            userInputed: decodedToken.name,
            userInputedId: decodedToken.id,
            recipient: pemesan,
            status: status,
            stock: stock,
            date_ongoing: date,
            bahanpenunjang: bahanpenunjang,
        };

        const newProject = await project.create(projectData);

        console.log('CREATED:', newProject);

        const lastProj = await project.findOne({
            order: [
                [
                    'createdAt', 'DESC'
                ]
            ]
        })

        console.log("ProjectID = ")
        console.log(lastProj.id)
        console.log({ "harga project": lastProj.price })
        const idproject = lastProj.id

        const tStock = await stockDetail.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });


        const reqStockArray = JSON.parse(lastProj.stock);
        const nameData = tStock.map(item => item.dataValues.name);
        const Quandat = reqStockArray.map(item => item.total);
        const reqName = reqStockArray.map(item => item.name)
        const stockReqAmount = reqStockArray.length

        for (let i = 0; i < stockReqAmount; i++) {
            const tipe1 = await stockNonDetail.findAll({
                where: { name: reqName[i] }
            });

            const idValue = tipe1.map(instance => instance.dataValues.id);

            const findStock = await stockDetail.findAll({
                where: {
                    stockId: idValue[0]
                },
                order: [
                    ['createdAt', 'ASC'] // Specify the column and direction
                ]
            });


            const arrayQuan = findStock.map(item => item.dataValues.amount)
            const idQuan = findStock.map(item => item.dataValues.id)
            const stocklength = findStock.length
            const totalAllPrice = 0

            const priceData = findStock.map(item => item.dataValues.price)
            const date = new Date()
            let containerHarga1
            let containerHarga2


            for (let x = 0; x < stocklength; x++) {

                if (Quandat[i] == arrayQuan[x]) {
                    const container = Quandat[i] - arrayQuan[x]
                    Quandat[i] = container;
                    totalPrice = (arrayQuan[x] * priceData[x]) + totalPrice
                    console.log({ "Total Harga": totalPrice })
                    await stockDetail.update({
                        amount: Quandat[i]
                    }, {
                        where: {
                            id: idQuan[x]
                        }
                    })
                    break
                } else if (Quandat[i] < arrayQuan[x]) {
                    const container = arrayQuan[x] - Quandat[i]
                    totalPrice = (Quandat[i] * priceData[x]) + totalPrice
                    Quandat[i] = container;
                    await stockDetail.update({
                        amount: Quandat[i]
                    }, {
                        where: {
                            id: idQuan[x]
                        }
                    })
                    break
                } else if (Quandat[i] > arrayQuan[x]) {
                    const container = Quandat[i] - arrayQuan[x]
                    Quandat[i] = container;

                    totalPrice = (arrayQuan[x] * priceData[x]) + totalPrice
                    await stockDetail.update({
                        amount: 0
                    }, {
                        where: {
                            id: idQuan[x]
                        }
                    })
                }
            }
        }

        const pendapatanPenjualan = price - totalPrice
        await project.update({
            totalitemprice: totalPrice
        }, {
            where: {
                id: lastProj.id
            }
        })
        const totalKredit = pendapatanPenjualan + totalPrice
        console.log({ "pendapatanPenjualan": pendapatanPenjualan })


        await acc.create({
            name: nama,
            deskripsi: desc
        })

        const idAcc = await acc.findOne({
            order: [
                ['createdAt', 'DESC'] // Specify the column and direction
            ]
        })

        console.log({ "ID Transaksi: ": idAcc.id })

        //debit piutang
        await accDetail.create({
            transactionId: idAcc.id,
            coaId: 304,
            nominal: price,
            userInputedId: decodedToken.id,
            userInputed: decodedToken.name,
            tipe: "Debit"
        })


        await accDetail.create({
            transactionId: idAcc.id,
            coaId: 302,
            nominal: pendapatanPenjualan,
            userInputedId: decodedToken.id,
            userInputed: decodedToken.name,
            tipe: "Kredit"
        })

        console.log({ "total price": totalPrice })

        await accDetail.create({
            transactionId: idAcc.id,
            coaId: 102,
            nominal: totalPrice,
            userInputedId: decodedToken.id,
            userInputed: decodedToken.name,
            tipe: "Kredit"
        })




        res.send("sukses");




    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).send("Internal Server Error");
    }
};

const test = async(req, res) => {
    try {
        const findtype = await stock.findOne({
            where: {
                name: "besi"
            }
        })

        console.log(findtype)
        res.send("sukses");

    } catch (error) {
        console.error("Error showing stock:", error);
        res.status(500).send("Internal Server Error");
    }
}



module.exports = {
    addProject,
    getProject,
    test,
    projectgantistatusiyes,
};