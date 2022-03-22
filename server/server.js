const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const path = require('path')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage
const grid = require('gridfs-stream')
const methodOverride = require('method-override')
const cookieParser = require("cookie-parser")

const connection = require('./Controllers/db')
const startup = require('./Routes/startup.routes')
const evaluatorAuth = require('./Routes/evaluatorAuth.routes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser(process.env.ACCESS_TOKEN_SECRET))

connection();

app.get("/", (req, res) => {
  res.send("Home");
});

app.use('/startup', startup)
app.use('/evaluator', evaluatorAuth)

app.listen(8000, () => console.log("Server on 8000"))
