import express from 'express';
import { createrecord,updaterecord,deleterecord,getrecord,getrecords,getuserRecords} from '../controllers/records.js';

const router= express.Router();

router.post('/createrecord',createrecord);
router.put('/updaterecord/:id',updaterecord);
router.delete('/deleterecord/:id',deleterecord);
router.get('/getrecord/:id',getrecord)
router.get('/getrecords/:userid',getuserRecords);
router.get('/getrecords',getrecords)

export default router;