require("./db/connect")
require("dotenv").config()

const express = require("express");
const app = express();
const tasks = require("./routes/tasks")
const connectDb = require("./db/connect")

app.use(express.json())
app.use("/api/v1/tasks", tasks)

app.get("/", (req, res) => {
    res.send("hello world");
})

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URL)
        app.listen(3000, () => {
            console.log("Server is listening on port 3000...")
        })
    } catch (error) {
        console.log(error)
    }
    
}

start()
