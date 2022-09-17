import User from "../models/User.js";
import historyCard from "../models/historyCard.js";

export const createrecord = async (req,res,next)=>{
    // res.status(200).json({data: req.body, message: 'xyz'})
    const newRecord = new historyCard(req.body);
    newRecord.prescription=req.file.path;
    try{
        const savedRecord = await newRecord.save();
        console.log(savedRecord);
        res.status(200).json(newRecord);
        
    }catch(err){
        next(err);
    }
}
export const updaterecord = async (req,res,next)=>{
    try{
        const record = await historyCard.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },
        {
            $new:true
        }
        );
        res.status(200).json(record);
        
    }catch(err){
        res.status(500).json(err);
    }
}
export const deleterecord = async (req,res,next)=>{
    try{
        const record = await historyCard.findByIdAndRemove(req.params.id)
        // // console.log('hi');
        // // console.log(req.query.id)
        res.status(200).json(record);
    }catch(err){
        res.status(500).json(err);
    }
}
export const getuserRecords = async (req,res,next)=>{
    try{
        const getRecords = await historyCard.find({patientId:req.params.userid});
        // // console.log(getRecords);
        res.status(200).json(getRecords);
    }catch(err){
        next(err);
    }
}
export const getrecord = async (req,res,next)=>{
    try{
        const getRecord = await historyCard.findById(req.params.id);
        res.status(200).json(getRecord);
    }
    catch(err){
        next(err);
    }
}
export const getrecords = async (req,res,next)=>{
    try{
        const getRecords = await historyCard.find();
        res.status(200).json(getRecords);
    }
    catch(err){
        next(err);
    }
}