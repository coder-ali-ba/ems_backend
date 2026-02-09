import express from 'express'
import { getMyTasks } from '../controllers/employeeController.js';

const employeeRouter = express.Router();

employeeRouter.get("/getmytasks" , getMyTasks)

export default employeeRouter