require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const port = process.env.PORT || 3000;
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const productRouter = require("./routes/products");

// middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/products", productRouter);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("hello world");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}... `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
