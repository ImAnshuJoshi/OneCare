import historyCard from "../models/historyCard.js";

export const medicalHistory = async(req,res,next) =>{
    try{
        // // const newRecord = new historyCard({
        // //     "diseasename":req.body.diseasename,
        // //     "checkdate":req.body.checkdate,
        // //     "weight":req.body.weight,
        // //     "height":req.body.height,
        // //     "desc":req.body.desc,
        // // })
        // const recordData = JSON.parse(req.body);
        // recordData["prescription"] = req.file.path
        // console.log(recordData);

        // // save only path to the file, since it's in the public folder
        // // recordData.prescription = req.file.path;
        
        // // // console.log('recordData', recordData);

        // // save..
        // const newRecord = new historyCard(recordData);

        // // console.log(newRecord);
        // // await newRecord.save();
        // // res.status(200).send(newRecord);

    }catch(err){
        next(err);
    }
}