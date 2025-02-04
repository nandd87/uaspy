const express = require("express")
const router = express.Router()

const controlMoney = require("../controller/moneyControl")

router.get("/totalkas", controlMoney.totalAllProductKas);
router.get("/totalutang", controlMoney.totalAllProductUtang);
router.get("/getallkas", controlMoney.totalAllKas);
module.exports = router;