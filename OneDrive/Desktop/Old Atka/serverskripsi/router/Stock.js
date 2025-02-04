const express = require("express")
const router = express.Router()

const controlStock = require("../controller/stockControls")

router.get("/getall", controlStock.getStock)
router.get("/findstock/:id", controlStock.getStockByParam)
router.post("/addstock", controlStock.addStock)
router.post("/retur", controlStock.retour)
router.post("/addpenunjang", controlStock.addPenunjang)
router.post("/tambahjenis", controlStock.addJenis)
router.get("/getalldetail", controlStock.getStockDetail)
router.get("/getpenunjang", controlStock.getPenunjang)
module.exports = router;