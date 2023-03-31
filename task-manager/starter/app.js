require("./db/connect");
require("dotenv").config();

const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDb = require("./db/connect");
const notFound = require("./middleware/notFount");
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT || 3000;

// middleware
app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("hello world");
});

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port} ...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
