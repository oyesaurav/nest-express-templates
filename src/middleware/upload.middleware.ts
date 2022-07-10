import { NextFunction, Request, Response } from "express";
const gfs = require("multer-gridfs-storage").GridFsStorage;
import * as dotenv from 'dotenv'
dotenv.config()
export const storage = new gfs({
    url: process.env.MONGO_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    file: (req, file) => {
       console.log("uploading..");
      return {
        bucketName: "photos",
        filename: `${Date.now()}-unikorn-${file.originalname}`,
      };
    },
});
