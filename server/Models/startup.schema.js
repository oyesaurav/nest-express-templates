const mongoose = require("mongoose");
// const passportLocalMongoose = require('passport-local-mongoose')

const startup = new mongoose.Schema({
    Name: String,
    email: String,
    password: String,
    phone_number: String,
    Headline: String,
    location: String,
    evaluators: Number,
    followers: Number,
    valuation: Number,
    overview: {
        website: URL,
        ceo: String,
        employees: String,
        sector: String,
        stage: String,
        founded: String,
        location: String
    },
    pinnedUpdates: [{
        updateId: String,
    }],
    problem: {
        heading: String,
        shortdescription: String,
        subheading: String,
        body: String,
        problemUrl: URL,    },
    solution: {
        heading: String,
        shortdescription: String,
        subheading: String,
        body: String,
        solutionUrl: URL,
    },
    futurePlans: {
        heading: String,
        shortdescription: String,
        subheading: String,
        body: String,
        plansUrl: URL,
    },
    storybehind: {
        heading: String,
        shortdescription: String,
        subheading: String,
        body: String,
        storyUrl: URL,
    },
    team: [{
        name: String,
        designation: String,
        photourl: String
    }],
    highlights: [{
        text: String 
    }],
});

// user.plugin(passportLocalMongoose)
module.exports = mongoose.model("Startup", startup);
