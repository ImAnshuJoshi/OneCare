import historyCard from "../models/historyCard.js";

export const medicalHistory = async(req,res,next) =>{
    try{
        // console.log(req.body);
        const newRecord = new historyCard({
            "diseasename":req.body.diseasename,
            "checkdate":req.body.checkdate,
            "weight":req.body.weight,
            "height":req.body.height,
            "desc":req.body.desc,
            // "prescription":req.body.myImage
        })

        await newRecord.save();
        res.status(200).send(newRecord);

    }catch(err){
        next(err);
    }
}