const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const startupdb = require('../Models/startup.schema')

const startupRegister = (req, res, next) => {
  startupdb.findOne({ email: req.body.email })
    .exec()
    .then((startup) => {
      if (!startup) {
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
            const newstartup = new startup({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              Name: req.body.name,
              phone_number: req.body.phone_number,
            })
            newstartup
              .save()
              .then(async (result) => {
                console.log(`startup created ${result}`)
                res.status(201).json({
                  startupDetails: {
                    startupId: result._id,
                    email: result.email,
                    Name: result.Name,
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
