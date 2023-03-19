const mongoose = require("mongoose");
// const passportLocalMongoose = require('passport-local-mongoose')

const reviews = new mongoose.Schema({
    startupId: String,
    startupName: String,
    startupEmail: String,
    reviews: [{
        body: String,
        photourl: URL,
        date: Date,
        likes: Number,
        comments: [{
            userid: String,
            name: String,
            date: Date,
            text: String,
        }]
    }]

});

// user.plugin(passportLocalMongoose)
module.exports = mongoose.model("Reviews", reviews);
