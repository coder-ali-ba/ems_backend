import employModel from "../models/employModel.js";
import jwt from "jsonwebtoken";
import tasksModel from "../models/tasksModel.js";

export const getMyAccount = async (req, res) => {
  try {
    const userId = req.headers.authorization.split(" ")[1];
    if (!userId) {
      return res.status(401).json({
        data: null,
        message: "Unauthorized ",
      });
    }
    const verifyId = jwt.verify(userId, process.env.PrivateKey);
    const myAccount = await employModel.findById(verifyId.id);
    res.status(200).json({
      data: myAccount,
      message: "your Account",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const userID = req.headers.authorization.split(" ")[1];
    if (!userID) {
      return res.status(401).json({
        data: null,
        message: "Unauthorized - No token provided",
      });
    }

    const verifyID = jwt.verify(userID, process.env.PrivateKey);
    const assignedTaskTo = await employModel.findById(verifyID.id);

    const myTasks = await tasksModel.find({ assignTo: assignedTaskTo.name });

    res.status(201).json({
      data: myTasks,
      message: "Got my Tasks",
    });
  } catch (error) {
    res.status(501).json({
      data: null,
      message: "somethin went wrong",
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const params = req.params.id;

    if (!params) {
      return;
      res.status(401).json({
        message: "not Found",
      });
    }
    const getTask = await tasksModel.findByIdAndUpdate(
      params,
      { status: "Completed" },
      { new: true },
    );

    res.status(201).json({
      data: getTask,
      message: "Status Changed",
    });
  } catch (error) {
    res.status(501).json({
      message: "Something went wrong",
    });
  }
};

export const updateStatusFailed = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(401).json({
        message: "Not Found",
      });
    }

    const updateStatus = await tasksModel.findByIdAndUpdate(
      taskId,
      { status: "Failed" },
      { new: true },
    );
    res.status(200).json({
      message: "Changed Status",
    });
  } catch (error) {
    res.status(501).json({
      message: "Something went wrong",
    });
  }
};

export const getUpcommingTasks = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        data: null,
        message: "Unauthorized",
      });
    }
    const verifyToken = jwt.verify(token, process.env.PrivateKey);
    const userName = await employModel.findById(verifyToken.id);
    const getTasks = await tasksModel.find({ assignTo: userName.name });

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const nextTwoDays = new Date(today);
    nextTwoDays.setDate(today.getDate() + 2);

    const filteredTasks = getTasks.filter((task) => {
      const deadline = new Date(task.date); 
      return deadline >= today && deadline <= nextTwoDays;
    });
    res.status(200).json({
      data: filteredTasks,
      message: "Got It",
    });
  } catch (error) {
    res.status(501).json({
      message: "something went wrong",
    });
  }
};

export const getPendingTask = async(req , res) => {
    try {
        const userToken = req.headers.authorization.split(" ")[1];
        if(!userToken){
            return res.status(401).json({
                message : "Unauthorized"
            })
        }
        const verifytoken = jwt.verify(userToken , process.env.PrivateKey);
        const getUser = await employModel.findById(verifytoken.id)

        const getTask = await tasksModel.find({
            assignTo : getUser.name,
            status : "Pending"
        })
        res.status(201).json({
            data : getTask,
        })
    } catch (error) {
        res.status(501).json({
            message : "Something went wrong"
        })
    }
}
