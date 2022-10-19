import multer = require("multer");
import moment = require("moment");
import { Response } from "express";
import * as CM from "../constant/response";
import * as Helpers from "../helpers";

const setResponse = Helpers.ResponseHelper;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },

  filename: function (req, file, cb) {
    console.log("--- image symbol --");
    const random = Math.floor(Math.random() * 10).toFixed(0);
    const ext = file.mimetype.split("/")[1];
    const currentTime = moment().format("HHMMSS");
    console.log(file, "file:::::::::::::::::::::::::");
    cb(null, `${random}_${currentTime}.${file.originalname}`);
  },
});

export const uploadProfilePic = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (CM.multerImageType.Profile.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export const uploadAttachment = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (CM.multerImageType.Message.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

// export const uploadAttachment = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (CM.multerImageType.Message.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   },
// });
