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

const fileViewer = async (req, res) => {
  try {
      const file = await gfs.files.findOne({ filename: req.params.filename })
      const readStream = gridfsBucket.openDownloadStreamByName(file.filename)
      readStream.pipe(res)
  }
  catch (err) {
      console.log(err)
      res.send("file not found")
  }
}

const fileUploader =  async (req, res) => {
  if (req.file === undefined) res.send("choose file first");
  else {
    const file1 = `http://localhost:8000/file/${req.file.filename}`;

    return res.json({
      url: file1,
    });
  }
}

module.exports = multer({ storage });

module.exports = {
  fileViewer,
  fileUploader
}