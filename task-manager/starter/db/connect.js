const mongoose = require("mongoose")

const connectDb = (url) => {
    return (
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log("Connected to db"))
            .catch((err) => console.log(err))   
    )
}

module.exports = connectDb

// mongoose
//     .connect(mongoURL)
//     .then(() => console.log("Connected to db"))
//     .catch((err) => console.log(err))