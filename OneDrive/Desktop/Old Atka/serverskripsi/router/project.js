const express = require("express")
const router = express.Router()

const controlProject = require("../controller/projectControl")

router.post("/new", controlProject.addProject)
router.get("/getallproject",controlProject.getProject)
router.get("/test" , controlProject.test)
router.post("/updatestatus/:id" , controlProject.projectgantistatusiyes)


module.exports = router;