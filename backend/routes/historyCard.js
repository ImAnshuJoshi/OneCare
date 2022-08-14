import express from 'express';
import { medicalHistory } from "../controllers/historyCard.js";
// import historyCard from "../models/historyCard";

const router = express.Router();
router.post('/addrecord',medicalHistory);

export default router;