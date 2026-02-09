import jwt  from 'jsonwebtoken';
import cloudinary from '../config/cloudinaryConfig.js'
import employModel from '../models/employModel.js';
import bcrypt  from 'bcrypt'


export const signupController = async(req , res) =>{
    try {
        const checkUser = await employModel.findOne({name : req.body.name})

        if(checkUser){
            res.json({
                data : null,
                message : "user already found"
            })
         return
        }

        //Upload to cloudinary
        const result =await cloudinary.uploader.upload(req.file.path);

        const hashPass = await bcrypt.hash(req.body.password , 10)

        const addUser =await employModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPass,
            imgURL: result.secure_url,
            
        })

        res.json({
            data : addUser,
            message : "successfully signed up"
        })
        
    } catch (error) {
        res.json({
            data : null,
            message : error.message
        })
        
    }
     
}


export const loginController = async(req , res) => {
    try {
        const body = req.body;
        const checkUser = await employModel.findOne({email : body.email})
        if(!checkUser) {
            res.json({
                data : null,
                message : "Invalid email"
            })
            return
        }

        const checkPass = await bcrypt.compare(body.password , checkUser.password);

        if(!checkPass){
            res.json({
                data : null,
                message : "Invalid Password"
            })
            return
        }

        const token = jwt.sign({id:checkUser._id} , process.env.PrivateKey);


        res.json({
            data:checkUser,
            message : "loggedin successfully",
            token : token
        })

        
    } catch (error) {
        res.json({
            data : null,
            message: error.message
        })
    }
    
}