// import express from 'express';
// import { medicalHistory } from "../controllers/historyCard.js";
// // import historyCard from "../models/historyCard";
// import multer from 'multer';

// const Storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "./uploads/");
//     },
//     filename: (req, file, cb) => {
//       cb(
//         null,
//         Date.now()+file.originalname
//       );
//     },
//   });

// const upload=multer({
//     storage:Storage,
//     limits:{
//         fieldSize:1024*1024*3
//     }
// })

// const router = express.Router();
// router.post('/addrecord',upload.single('image'),medicalHistory);

// export default router;