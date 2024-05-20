const Task = require("../models/tasksModel")







const getAllTasks = async (req, res)=>{
    const {title} = req.query
    try {
        const taskQuery = {}
        if (title) {
            taskQuery.title = {$regex: title, $options: "i" }
        }
        const task = await Task.find(taskQuery)
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
const createTask = async (req, res)=>{
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
const getTask = async (req, res)=>{
    const {id} = req.params
    try {
        const task = await Task.findOne({_id: id})
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
const updateTask = async (req, res)=>{
    const {id} = req.params
    try{
        const task = await Task.findByIdAndUpdate({_id: id}, req.body, {new: true})
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({error: error.message})
    }
}
const deleteTask = async (req, res)=>{
    const {id} = req.params
    try {
        const task = await Task.findByIdAndDelete(id)
         res.status(200).json({task})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }