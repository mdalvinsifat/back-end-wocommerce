const multer = require('multer')

const storge = multer.memoryStorage()
const SingleUpload = multer({storge}).single("image")




module.exports = SingleUpload