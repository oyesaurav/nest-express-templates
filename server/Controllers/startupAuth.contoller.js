const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const startup = require('../Models/startup.schema')

const startupRegister = (req, res, next) => {
  startup.find({ email: req.body.email })
    .exec()
    .then((startup) => {
      if (startup.length >= 1) {
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
            const startup = new startup({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              phone_number: req.body.phone_number,
            })
            startup
              .save()
              .then(async (result) => {
                await result
                  .save()
                  .then((result1) => {
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
                    res.status(400).json({
                      message: err.toString(),
                    })
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

const startupLogin = (req, res, next) => {
  startup.find({ email: req.body.email })
    .exec()
    .then((startup) => {
      console.log(startup)
      if (startup.length < 1) {
        return res.status(401).json({
          message: "Auth failed: Email not found probably",
        })
      }
      bcrypt.compare(req.body.password, startup[0].password, (err, result) => {
        if (err) {
          console.log(err)
          return res.status(401).json({
            message: "Auth failed",
          })
        }
        if (result) {
          const token = jwt.sign(
            {
              startupId: startup[0]._id,
              email: startup[0].email,
              name: startup[0].name,
              phone_number: startup[0].phone_number,
            },
            process.env.jwtSecret,
            {
              expiresIn: "1d",
            }
          )
          console.log(startup[0])
          return res.status(200).json({
            message: "Auth successful",
            startupDetails: {
              startupId: startup[0]._id,
              name: startup[0].name,
              email: startup[0].email,
              phone_number: startup[0].phone_number,
            },
            token: token,
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
