import { NextFunction, Request, Response } from "express";
const gfs = require("multer-gridfs-storage").GridFsStorage;

export const storage = new gfs({
    url: "mongodb+srv://sauravpati:cubiccyber@cluster0.10s6rqq.mongodb.net/cyber?retryWrites=true&w=majority",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    file: (req, file) => {
      // const match = ["image/png", "image/jpg"]
  
      // if (match.indexOf(file.mimetype === -1)) {
      //     const filename = `${Date.now()}-unikorn-${file.originalname}`;
      //     return filename
      // }
       console.log("uploading..");
       
      return {
        bucketName: "photos",
        filename: `${Date.now()}-criminal-${file.originalname}`,
      };
    },
});
