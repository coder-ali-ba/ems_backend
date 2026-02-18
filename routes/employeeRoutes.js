import express from 'express'
import { getCompletedTask, getFailedTask, getMyAccount, getMyTasks, getPendingTask, getUpcommingTasks, updateStatus, updateStatusFailed } from '../controllers/employeeController.js';
import { AuthCheck } from '../middleWares/authMiddleware.js';

const employeeRouter = express.Router();

employeeRouter.get("/getmytasks" , AuthCheck , getMyTasks)
employeeRouter.put("/updatestatus/:id" , AuthCheck , updateStatus)
employeeRouter.put("/updatestatusfailed/:id" , AuthCheck , updateStatusFailed)
employeeRouter.get("/getmyaccount" , AuthCheck , getMyAccount)
employeeRouter.get("/getupcomming" , AuthCheck , getUpcommingTasks)
employeeRouter.get("/getpendingtask" , AuthCheck , getPendingTask)
employeeRouter.get("/getcompletedtask" , AuthCheck , getCompletedTask)
employeeRouter.get("/getfailedtask" , AuthCheck , getFailedTask)

export default employeeRouter