import mongoose from 'mongoose';

const historyCardSchema = new mongoose.Schema({
    diseasename:{
        type:String,
        required:true,
    },
    weight:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    medicines:{
        type:[String],
        required:true
    },
    desc:{
        type:String,
        requried:true
    },
    checkdate:{
        type:Date,
        required:true
    },
    patientId:{
        type:String
    },
    prescription:{
        type:String,
        default: ""
    }

},{timestamps:true})

export default mongoose.model("cardRecord",historyCardSchema);