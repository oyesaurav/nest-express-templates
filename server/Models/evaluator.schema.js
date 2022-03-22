const mongoose = require("mongoose");
// const passportLocalMongoose = require('passport-local-mongoose')

const evaluator = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone_number: Number,
    following: [{
        companyName: String,
        companyId: String
    }]
});

// user.plugin(passportLocalMongoose)
module.exports = mongoose.model("Evaluator", evaluator);
