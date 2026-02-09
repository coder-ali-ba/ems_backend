import express from "express";
import { addTaskController, deleteTask, getAllTasks, getSpecificUser } from "../controllers/adminControllers.js";
import { adminAuthCheck } from "../middleWares/authMiddleware.js";

const adminRouter = express.Router()

adminRouter.post ("/addtask" , adminAuthCheck , addTaskController);
adminRouter.get("/getalltasks" , adminAuthCheck , getAllTasks);
adminRouter.get("/getusers" , adminAuthCheck , getSpecificUser);
adminRouter.delete("/deletetask/:id" , adminAuthCheck , deleteTask)

export default adminRouter