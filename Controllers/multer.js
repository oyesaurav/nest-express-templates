const dotenv = require("dotenv").config();
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
const grid = require("gridfs-stream");
const mongoose = require('mongoose')

let gfs, gridfsBucket;

const conn = mongoose.connection;
conn.once("open", function () {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
      });
    gfs = grid(conn.db, mongoose.mongo)
    gfs.collection('photos')
})

const storage = new GridFsStorage({
  url: process.env.MONGO_DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    return {
      bucketName: "photos",
      filename: `${Date.now()}-unikorn-${file.originalname}`,
    };
  },
});


module.exports = multer({ storage });