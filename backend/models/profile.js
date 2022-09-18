import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        requried:true
    }

},{timestamps:true})

export default mongoose.model("Profile",profileSchema);