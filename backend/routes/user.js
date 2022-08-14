import express from 'express';
import { updateUser,deleteUser,getUser,getUsers} from '../controllers/user.js';

const router= express.Router();

router.put('/updateuser/:id',updateUser);
router.delete('/deleteuser/:id',deleteUser);
router.get('/getuser/:id',getUser);
router.get('/getUsers',getUsers);

export default router;