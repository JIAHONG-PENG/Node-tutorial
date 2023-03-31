const express = require("express")
const router = express.Router()
const {
    getAllTasks,
    postTask,
    updateTask,
    deleteTask,
    getSingleTask
} = require("../controllers/tasks")

router.route("/").get(getAllTasks).post(postTask)
router.route("/:id").patch(updateTask).delete(deleteTask).get(getSingleTask)

module.exports = router
