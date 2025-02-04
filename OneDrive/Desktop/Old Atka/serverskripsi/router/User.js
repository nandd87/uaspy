const express = require("express")
const router = express.Router()

const controluser = require("../controller/userControls");
const { route } = require("./Stock");

router.get("/findall", controluser.getUser);
router.get("/isLogin", controluser.isLogin);
router.post("/login", controluser.loginUser)
router.post("/create", controluser.createUser)
router.delete("/logout", controluser.shopLogout)
router.delete("/remove/:id" , controluser.deleteUser)
module.exports = router;