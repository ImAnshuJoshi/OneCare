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
import ImageKit from "imagekit";
import fs from "fs";

const router = express.Router();
dotenv.config()

router.post("/createrecord", createrecord);
router.put("/updaterecord/:id", updaterecord);
router.delete("/deleterecord/:id", deleterecord);
router.get("/getrecord/:id", getrecord);
router.get("/getrecords/:userid", getuserRecords);
router.get("/getrecords", getrecords);
router.get("/auth", (req, res) => {
 
    var imagekit = new ImageKit({
        publicKey : process.env.IMAGEKIT_PUBLIC_KEY  ,
        privateKey :  process.env.IMAGEKIT_PRIVATE_KEY ,
        urlEndpoint : process.env.IMAGEKIT_URL
    });
});

export default router;
