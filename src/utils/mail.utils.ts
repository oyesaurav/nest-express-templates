import * as nodemailer from 'nodemailer'
// import { google } from 'googleapis'
import * as dotenv from 'dotenv'
dotenv.config()

// const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.PASS,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        // accessToken: getAccessToken()
    },
});

// async function getAccessToken() {
//     console.log(REFRESH_TOKEN);
//     const Oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
//     Oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
//     const at = await Oauth2Client.getAccessToken()
//     return at;
// }

