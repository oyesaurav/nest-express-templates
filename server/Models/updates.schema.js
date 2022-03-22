const mongoose = require("mongoose");
// const passportLocalMongoose = require('passport-local-mongoose')

const updates = new mongoose.Schema({
    startupId: String,
    startupName: String,
    startupEmail: String,
    articles: [{
        heading: String,
        body: String,
        photourl: URL,
        date: Date,
        likes: Number,
        bookmarks: Number,
        comments: [{
            userid: String,
            name: String,
            date: Date,
            text: String,
        }]
    }]

});

// user.plugin(passportLocalMongoose)
module.exports = mongoose.model("Updates", updates);
