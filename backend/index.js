import express from 'express';
import  mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
import cors from 'cors';
import authRoute from './routes/auth.js';
import recordRoute from './routes/records.js'
import usersRoute from './routes/user.js';
import User from './models/User.js';

import multer from "multer";
dotenv.config();
import bodyParser from 'body-parser';

app.use('/uploads',express.static('uploads'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors({
  origin: true,
}))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix+" "+file.originalname);
  }
})

const upload= multer({storage:storage});


const connect = async () =>{
    try {
         mongoose.connect(process.env.MONGO ,{
            useUnifiedTopology: true,
            useNewUrlParser: true
          });
        console.log('Connected to mongoDB');
      } catch (error) {
        throw error;
      }
}

mongoose.connection.on("connected",()=>{
    console.log('MongoDB connected');
})

mongoose.connection.on("disconnected",()=>{
  console.log('MongoDB disconnected');
})

app.use('/api/auth',authRoute);
app.use('/api/record',recordRoute);
app.use('/api/users',usersRoute);
app.get('/allusers',async (req,res)=>{
  const users = await User.find();
// res.status(200).json(users);
res.send(users)
})
app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 400;
    const errorMessage = err.message||"Something went wrong"

    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        Message:errorMessage,
        stack:err.stack
    })
})

app.listen(process.env.PORT,()=>{
    connect()
    console.log('server is listening on port 3000...');
})

