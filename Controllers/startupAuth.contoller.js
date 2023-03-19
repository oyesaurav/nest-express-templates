const bcrypt = require("bcrypt")
const mongoose = require('mongoose')
require("dotenv").config()
const jwt = require("jsonwebtoken")
const startupdb = require('../Models/startup.schema')

const startupRegister = (req, res, next) => {
  startupdb.findOne({ email: req.body.email })
    .exec()
    .then((startup) => {
      if (startup) {
        res.status(409).json({
          message: "Email Exists",
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            })
          } else {
            const newstartup = new startupdb({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              phone_number: req.body.phone_number,
              Headline: req.body.Headline || null,
              location: req.body.location || null,
              overview: {
                website: req.body.website || null,
                ceo: req.body.ceo || null,
                employees: req.body.employees || null,
                sector: req.body.sector || null,
                stage: req.body.stage || null,
                founded: req.body.founded || null,
                location: req.body.location || null
              },
              pinnedUpdates : [],
              problem: {
                heading: req.body.pheading || null,
                shortdescription: req.body.pshortdescription || null,
                subheading: req.body.psubheading || null,
                body: req.body.pbody || null,
                problemUrl: req.body.problemUrl || null,
              },
              solution: {
                heading: req.body.sheading || null,
                shortdescription: req.body.sshortdescription || null,
                subheading: req.body.ssubheading || null,
                body: req.body.sbody || null,
                solutionUrl: req.body.solutionUrl || null,
              },
              futurePlans: {
                heading: req.body.fheading || null,
                shortdescription: req.body.fshortdescription || null,
                subheading: req.body.fsubheading || null,
                body: req.body.fbody || null,
                plansUrl: req.body.plansUrl || null,
              },
              storybehind: {
                heading: req.body.sbheading || null,
                shortdescription: req.body.sbshortdescription || null,
                subheading: req.body.sbsubheading || null,
                body: req.body.sbbody || null,
                storyUrl: req.body.storyUrl || null,
              },
              team: [],
              highlights: []
            })
            newstartup
              .save()
              .then(async (result) => {
                console.log(`startup created ${result}`)
                res.status(201).json({
                  startupDetails: {
                    startupId: result._id,
                    email: result.email,
                    name: result.name,
                    phone_number: result.phone_number,
                  },
                })
              })
              .catch((err) => {
                console.log(err)
                res.status(500).json({
                  message: err.toString(),
                })
              })
          }
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

const startupLogin = async (req, res, next) => {
  await startupdb.findOne({ email: req.body.email })
    .exec()
    .then((startup) => {
      if (!startup) {
        return res.status(401).json({
          message: "Auth failed: Email not found probably",
        })
      }
      bcrypt.compare(req.body.password, startup.password, (err, result) => {
        if (err) {
          console.log(err)
          return res.status(401).json({
            message: "Auth failed",
          })
        }
        if (result) {
          const accessToken = jwt.sign(
            {
              startupId: startup._id,
              email: startup.email,
              name: startup.name,
              phone_number: startup.phone_number,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          )
          const refreshToken = jwt.sign(
            {
              startupId: startup._id,
              email: startup.email,
              name: startup.name,
              phone_number: startup.phone_number,
            },
            process.env.REFRESH_TOKEN_SECRET
            )
          console.log(startup)
          res.cookie("AT", accessToken, {
            maxAge: 900000,
            httpOnly: true,
            secure: false,
            signed: true,
          })
          res.cookie("RT", refreshToken, {
            httpOnly: true,
            secure: false,
            signed: true,
          })
          return res.status(200).json({
            message: "Auth successful",
            startupDetails: {
              startupId: startup._id,
              name: startup.name,
              email: startup.email,
              phone_number: startup.phone_number,
            },
            token: accessToken,
          })
        }
        res.status(401).json({
          message: "Auth failed1",
        })
      })
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      })
    })
}


module.exports = {
  startupLogin,
  startupRegister
}
