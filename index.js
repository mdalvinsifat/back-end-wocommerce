const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const ConnectDB = require("./Connect/Connect")
const router = require("./route/route")
const cloudinary = require("cloudinary")

cloudinary.v2.config({
    cloud_name:"dhhb29n7c",
    api_key:"179218646364157",
    api_secret:"HkN-ppaJPIiycewX4FNT27MCW_I"
    
})
//midlware 
const app = express()
app.use(express.json())
dotenv.config()
app.use(cors())

app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

app.use("/api/v1", router)
ConnectDB()
const port = process.env.PORT
app.listen(port , () => console.log(`http://localhost:${port}`))
