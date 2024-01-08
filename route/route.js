const express = require("express")
const {CreateProduct, GetProduct, ReadId , Delete, Update, SearchKeyword} = require("../controller/Controller")
const SingleUpload = require("../middlwares/multer")
const router = express.Router()


router.get("/get",GetProduct)
router.get("/get/:id",ReadId)
router.delete("/delete/:id",Delete)
router.put("/update/:id",SingleUpload,Update)
router.post("/create",SingleUpload, CreateProduct)


//search 
router.get("/search/:keyword", SearchKeyword)

module.exports  = router