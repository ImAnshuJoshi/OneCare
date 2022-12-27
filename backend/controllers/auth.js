//openssl rand -base64 32

import User from "../models/User.js";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; 

dotenv.config();

export const register = async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser= new User({
            username:req.body.username,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password:hash,
            isAdmin:req.body.isAdmin,
        })
        await newUser.save();
        if(newUser){
            const token= jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.JWT);
            res.cookie("token",token);
            
        }
        res.status(200).send(newUser);
        res.status(200).json({
            user: newUser,
            message: 'User has been signed in!',
            token: token,
          })
        // else
    }
    catch(err){
        next(err);
    }
}

export const login = async (req,res,next)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user){
            return next(createError(404,"User does not exsist"));
        }

        const isPassword = await bcrypt.compare(req.body.password,user.password);
        if(!isPassword){
            return next(createError(400,"Wrong Password"));
        }

        const token= jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
        const {password,isAdmin,...otherDetails}= user._doc;

        // res.cookie(
        //     "access_token",
        //     token,{
        //         httpOnly:true,
        //     }).status(200).json({ details:{...otherDetails},isAdmin});
        
        res.cookie("token",token);

    }catch(err){
        next(err);
    }
}
export const logout = async (req,res,next)=>{
    try{
        localStorage.removeItem("user");
    }
    catch(err){
        next(err);
    }
}