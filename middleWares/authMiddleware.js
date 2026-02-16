import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import employModel from "../models/employModel.js";


export const adminAuthCheck  = async(req , res , next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token , process.env.PrivateKey)

        if(verify){
            const user = await employModel.findById(verify.id)
            if(user.role !== "admin"){
                res.json({
                    data : null,
                    message: "Unauthorized "
                })
              return
            }
             req.user = verify;
            return next()

        }else{
            res.json({
                data : null,
                message : "Authentication Error"
            })
        }
    } catch (error) {
        res.json({
            data : null,
            message : error.message
        })
    }
} 

export const AuthCheck  = async(req , res , next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token , process.env.PrivateKey)

        if(verify){
            const user = await employModel.findById(verify.id)
            if(!user){
                res.json({
                    data : null,
                    message: "Authentication Error"
                })
              return
            }
             req.user = verify;
            return next()

        }else{
            res.json({
                data : null,
                message : "Authentication Error"
            })
        }
    } catch (error) {
        res.json({
            data : null,
            message : error.message
        })
    }
} 