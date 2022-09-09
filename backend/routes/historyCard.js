import express from 'express';
import { medicalHistory } from "../controllers/historyCard.js";
// import historyCard from "../models/historyCard";
import multer from 'multer';

// const storage = multer.diskStorage({

//     //destination for the files
//     destination:function(request,response,callback){
//         callback(null,'./public/uploads/images');
//     },

//     //filenae
//     filename:function(request,response,callback){
//         callback(null,Date.now()+file.originalname)
//     }
// });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        Date.now()+file.originalname
      );
    },
  });

const upload=multer({
    storage:storage,
    limits:{
        fieldSize:1024*1024*3
    }
})

const router = express.Router();
router.post('/addrecord',upload.single('image'),medicalHistory);

export default router;