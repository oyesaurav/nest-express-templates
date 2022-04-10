const jwt = require('jsonwebtoken')
const { connect } = require('mongoose')
const dotenv = require('dotenv').config()

module.exports = function authToken(req, res, next) {

    const accessToken = req.signedCookies.AT
    const refreshToken = req.signedCookies.RT
    if (accessToken === null) return res.sendStatus(401)

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
                if (error) return res.status(400).send("Auth failed")
                const newAccessToken = jwt.sign(
                    {
                        startupId: user._id,
                        email: user.email,
                        name: user.name,
                        phone_number: user.phone_number,
                    },
                    process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "1d",
                })
                res.cookie("AT", newAccessToken, {
                    maxAge: 900000,
                    httpOnly: true,
                    secure: false,
                    signed: true,
                  })
                req.user = user
                next()
            })
        }
        else {
            req.user = user
            next()
        }
    })
}

