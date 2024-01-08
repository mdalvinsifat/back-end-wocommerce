const { default: mongoose } = require("mongoose")


const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE)
        console.log("Connect DB ")
    } catch (error) {
        console.log(error)
    }
}
module.exports  = ConnectDB;