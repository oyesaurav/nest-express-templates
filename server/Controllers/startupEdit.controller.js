const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const startup = require('../Models/startup.schema')

const startupRegister = (req, res, next) => {
  startup.find({ email: req.body.email })
    .exec()
    .then((startup) => {
      if (startup.length < 1) {
        res.status(409).json({
          message: "Email not registered",
        })
      } else {
        
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

}
