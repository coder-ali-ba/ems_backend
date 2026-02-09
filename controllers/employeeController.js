import tasksModel from "../models/tasksModel.js"

export const getMyTasks = async (req , res) => {
    const body = req.body;

    try {
        const getTasks = await tasksModel.find({assignTo : "talha"})
        res.json ({
            data : getTasks,
            message : "Got my Tasks"
        })
    } catch (error) {
        res.json({
            data : null,
            message : "somethin went wrong"
        })
    }
}