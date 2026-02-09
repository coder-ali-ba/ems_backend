import { response } from 'express';
import employModel from '../models/employModel.js';
import tasksModel from '../models/tasksModel.js'

export const addTaskController = async(req , res) => {
    try {
        const body = req.body;
        const addTask = await tasksModel.create(body)
        res.json({
            data : addTask,
            message : "task added successfully"
        })
        
    } catch (error) {
        res.json({
            data : null,
            message : "something went wrong"
        })
    }
}

export const getAllTasks = async(req , res) =>{
    const getTasks = await tasksModel.find({})

    res.json({
        data : getTasks,
        message : "get all tasks"
    })
}

export const getSpecificUser = async(req , res) => {
    try {
        const getUsers = await employModel.find({role : "employee"});
        res.json({
            data : getUsers,
            message : "getUsersName"
        })
        
    } catch (error) {
        res.json({
            data : null ,
            message : error.message
        })
    }
}

export const deleteTask = async(req , res) => {
    try {
        const taskId = req.params.id
        const deteledTask = await tasksModel.findByIdAndDelete(taskId);
        
        res.json({
            message:"deleted Successfully"
        })

    } catch (error) {
        res.json({
            message : error.message
        })
    }
}