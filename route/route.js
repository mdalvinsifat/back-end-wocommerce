const express = require("express")
const {CreateProduct, GetProduct, ReadId , Delete, Update, SearchKeyword} = require("../controller/Controller")
const upload = require("../middlwares/multer")
const router = express.Router()


router.get("/get",GetProduct)
router.get("/get/:id",ReadId)
router.delete("/delete/:id",Delete)
router.put("/update/:id",upload.single("image"),Update)
router.post("/create",upload.single("image"), CreateProduct)


//search 
router.get("/search/:keyword", SearchKeyword)

module.exports  = router