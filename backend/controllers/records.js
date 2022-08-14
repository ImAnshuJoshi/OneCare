import User from "../models/User.js";
import historyCard from "../models/historyCard.js";

export const createrecord = async (req,res,next)=>{
    const newRecord = new historyCard(req.body);
    try{
        const savedRecord = newRecord.save();
        res.status(200).send(newRecord);
        
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
        const record = await historyCard.findByIdAndDelete(req.params.id)
        res.status(200).json(record);
    }catch(err){
        res.status(500).json(err);
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