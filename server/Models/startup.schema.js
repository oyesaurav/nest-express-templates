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
        website: String,
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
        problemUrl: String,
    },
    solution: {
        heading: String,
        shortdescription: String,
        subheading: String,
        body: String,
        solutionUrl: String,
    },
    futurePlans: {
        heading: String,
        shortdescription: String,
        subheading: String,
        body: String,
        plansUrl: String,
    },
    storybehind: {
        heading: String,
        shortdescription: String,
        subheading: String,
        body: String,
        storyUrl: String,
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
