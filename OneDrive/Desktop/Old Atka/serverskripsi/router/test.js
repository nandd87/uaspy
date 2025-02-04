const express = require("express")
const router = express.Router()

const controlMoney = require("../controller/moneyControl")
const project = require("../controller/projectControl")

router.get("/test1", project.test);

module.exports = router;