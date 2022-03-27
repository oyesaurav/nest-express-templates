const bcrypt = require("bcrypt")
const mongoose = require('mongoose')
require("dotenv").config()
const jwt = require("jsonwebtoken")
const startupdb = require('../Models/startup.schema')

const getStartupDetails = async (req, res, next) => {
    await startupdb.findOne({ _id : req.user.data.startupId})
      .exec()
      .then((startup) => {
        if (!startup) {
          res.status(409).json({
            message: "Startup not registered",
          })
        } else {
            // if (req.user.token) {
            //     const newAccessToken = jwt.sign(
            //         {
            //             startupId: startup._id,
            //             email: startup.email,
            //             name: startup.name,
            //             phone_number: startup.phone_number,
            //         },
            //         process.env.ACCESS_TOKEN_SECRET, {
            //         expiresIn: "1d",
            //     })
            //     res.cookie("AT", newAccessToken, {
            //         maxAge: 900000,
            //         httpOnly: true,
            //         secure: false,
            //         signed: true,
            //       })
            // }
            res.status(200).json({
              startup : startup
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
    getStartupDetails,
}