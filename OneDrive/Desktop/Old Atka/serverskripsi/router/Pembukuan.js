const express = require("express")
const router = express.Router()

const controlStock = require("../controller/stockControls")
const report = require("../controller/transactionControl")

router.get("/getall", report.getAllAccount)
router.get("/tes1", report.getAllAccount)
router.post("/new/:id" , report.Pembuatantransaksi)
router.post("/pembayaranbeban" , report.pembayaranBeban)
router.get("/getcoa" , report.getcoa)
router.get("/getdetail" , report.getTransactionDetail)
module.exports = router;