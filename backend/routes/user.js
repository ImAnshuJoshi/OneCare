import express from 'express';
import { updateUser,deleteUser,getUser,getusers} from '../controllers/user.js';

const router= express.Router();

router.put('/updateuser/:id',updateUser);
router.delete('/deleteuser/:id',deleteUser);
router.get('/getuser/:id',getUser);
router.get('/getusers',getusers);

export default router;