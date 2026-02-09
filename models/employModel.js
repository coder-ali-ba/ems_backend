import mongoose from "mongoose";

const employSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    imgURL: String,
    role :{
        type : String,
        enum : ["admin" , "employee"],
        default : "employee"
    }
})

export default mongoose.model("employees" , employSchema)