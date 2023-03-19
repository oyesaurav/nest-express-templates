const mongoose = require('mongoose')
require("dotenv").config()
const jwt = require("jsonwebtoken")
const startupdb = require('../Models/startup.schema')
const updatesModel = require('../Models/updates.schema')

const postUpdate = async (req, res, next) => {
    await updatesModel.findOne({ startupId : req.user.startupId})
      .exec()
      .then((update) => {
        if (!update) {
            newUpdate = new updatesModel({
                _id: new mongoose.Types.ObjectId(),
                startupId: startup._id,
                startupName: startup.name,
                startupEmail: startup.email,
                articles: [{
                    heading: req.body.heading,
                    body: req.body.body,
                    photourl: req.body.photourl,
                    date: new Date(),
                    likes: 0,
                    bookmarks: 0,
                    comments: []
                }]
            })
            newUpdate
              .save()
              .then(async (result) => {
                console.log(` update - ${result}`)
                res.status(201).json({
                  updateDetails: {
                    startupId: result._id,
                    articles: result.articles
                  },
                })
              })
              .catch((err) => {
                console.log(err)
                res.status(500).json({
                  message: err.toString(),
                })
              })
        } else {
            updatesModel.updateOne({ startupId : req.user.startupId }, {
                $push: {
                  articles: {
                    heading: req.body.heading,
                    body: req.body.body,
                    photourl: req.body.photourl,
                    date: new Date(),
                    likes: 0,
                    bookmarks: 0,
                    comments: []
                  }
                }
              })
              .exec()
              .then(result => {
                return res.status(200).json({message : "new update added"})
              })
              .catch((err) => {
                console.log(err)
                res.status(500).json({
                  message: err.toString(),
                })
              })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          message: err.toString(),
        })
      })
}

const editUpdate = async (req, res, next) => {
    await updatesModel.findOne({ startupId : req.user.startupId})
      .exec()
      .then((update) => {
        if (!update) {
            res.status(409).json({
                message: "No updates found for this startup",
              })
        } else {
            updatesModel.updateOne({ startupId : req.user.startupId , "articles._id" : req.body.articleId}, {
                $set: {
                    "articles.$.heading": req.body.heading,
                    "articles.$.body": req.body.body,
                    "articles.$.photourl": req.body.photourl
                }
              })
              .exec()
              .then(result => {
                return res.status(200).json({message : "update edited"})
              })
              .catch((err) => {
                console.log(err)
                res.status(500).json({
                  message: err.toString(),
                })
              })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          message: err.toString(),
        })
      })
}

const deleteUpdate = async (req, res, next) => {
    await updatesModel.findOne({ startupId : req.user.startupId})
      .exec()
      .then((update) => {
        if (!update) {
            res.status(409).json({
                message: "No updates found for this startup",
              })
        } else {
            updatesModel.deleteOne({ startupId : req.user.startupId}, {
                $pull: {
                    articles: {_id : req.body.articleId}
                }
              })
              .exec()
              .then(result => {
                return res.status(200).json({message : "update deleted"})
              })
              .catch((err) => {
                console.log(err)
                res.status(500).json({
                  message: err.toString(),
                })
              })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          message: err.toString(),
        })
      })
}

const getUpdates = async (req, res, next) => {
    await updatesModel.findOne({ startupId : req.user.startupId})
      .exec()
      .then((update) => {
        if (!update) {
            res.status(409).json({
                message: "No updates found for this startup",
              })
        } else {
            res.status(200).json({
                articles: update.articles
            })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          message: err.toString(),
        })
      })
}

module.exports = {
    postUpdate,
    editUpdate,
    deleteUpdate,
    getUpdates
}