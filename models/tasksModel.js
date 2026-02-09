import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskTitle : String,
    date : String,
    assignTo : String,
    category : String,
    description : String,
    status :{
        type : String,
        enum : ["Pending" , "Completed" , "Failed"],
        default:"Pending"
    },
    isDeleted : {
        type :Boolean,
        default : false 
    }
})

export default mongoose.model("tasks" , taskSchema)