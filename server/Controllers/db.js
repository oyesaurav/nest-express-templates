const mongoose = require('mongoose')

module.exports = async function connection() {

    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(process.env.MONGO_DB_URL, connectionParams)
        console.log("DB connected")
    }
    catch (err){
        console.log(err)
        console.log("couldn't connect to db")
    }
}