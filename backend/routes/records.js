import express from "express";
import {
  createrecord,
  updaterecord,
  deleterecord,
  getrecord,
  getrecords,
  getuserRecords,
} from "../controllers/records.js";
import dotenv from "dotenv";

import multer from 'multer';
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now()+file.originalname
    );
  },
});

const upload=multer({
  storage:Storage,
  limits:{
      fieldSize:1024*1024*3
  }
})


const router = express.Router();
dotenv.config()

router.post("/", upload.single('image'),createrecord);
router.put("/updaterecord/:id", updaterecord);
router.delete("/deleterecord/:id", deleterecord);
router.get("/getrecord/:id", getrecord);
router.get("/getrecords/:userid", getuserRecords);
router.get("/getrecords", getrecords);

export default router;
