import express from 'express';
import  mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
import authRoute from './routes/auth.js';
import historyCard from './routes/historyCard.js';
import recordRoute from './routes/records.js'
import usersRoute from './routes/user.js';

dotenv.config();

app.use(express.json());

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
  console.log('MongoDB connected');
})

app.use('/api/auth',authRoute);
app.use('/api/record',recordRoute);
app.use('api/users',usersRoute);

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


app.listen(3000,()=>{
    connect()
    console.log('server is listening on port 3000...');
})

