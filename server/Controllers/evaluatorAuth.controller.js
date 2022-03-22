const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const evaluator = require('../Models/evaluator.schema')

const evaluatorRegister = (req, res, next) => {
  evaluator.find({ email: req.body.email })
    .exec()
    .then((evaluator) => {
      if (evaluator.length >= 1) {
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
            const newevaluator = new evaluator({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              phone_number: req.body.phone_number,
              following : 0
            })
            evaluator
              .save()
              .then(async (result) => {
                await result
                  .save()
                  .then((result1) => {
                    console.log(`evaluator created ${result}`)
                    res.status(201).json({
                      evaluatorDetails: {
                        evaluatorId: result._id,
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

const evaluatorLogin = (req, res, next) => {
  Ad.find({ email: req.body.email })
    .exec()
    .then((evaluator) => {
      console.log(evaluator)
      if (evaluator.length < 1) {
        return res.status(401).json({
          message: "Auth failed: Email not found probably",
        })
      }
      bcrypt.compare(req.body.password, evaluator[0].password, (err, result) => {
        if (err) {
          console.log(err)
          return res.status(401).json({
            message: "Auth failed",
          })
        }
        if (result) {
          const accessToken = jwt.sign(
            {
              evaluatorId: evaluator[0]._id,
              email: evaluator[0].email,
              name: evaluator[0].name,
              phone_number: evaluator[0].phone_number,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          )
          const refreshToken = jwt.sign(
            {
              evaluatorId: evaluator[0]._id,
              email: evaluator[0].email,
              name: evaluator[0].name,
              phone_number: evaluator[0].phone_number,
            },
            process.env.REFRESH_TOKEN_SECRET
          )
          console.log(evaluator[0])
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
            evaluatorDetails: {
              evaluatorId: evaluator[0]._id,
              name: evaluator[0].name,
              email: evaluator[0].email,
              phone_number: evaluator[0].phone_number,
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
  evaluatorLogin,
  evaluatorRegister
}
