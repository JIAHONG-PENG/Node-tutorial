const Task = require("../models/tasks")

const getAllTasks = (req, res) => {
    res.send("tasks page")
}

const postTask = async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
}

const updateTask = (req, res) => {
    res.send("update a task")
}

const deleteTask = (req, res) => {
    res.send("delete a task")
}

module.exports = { getAllTasks, postTask, updateTask, deleteTask }