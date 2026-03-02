require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const userRouter = require("./routes/user")
const listingRouter = require('./routes/listing')
const cookieParser = require('cookie-parser')
const bookingRouter = require('./routes/booking')
mongoose.connect(process.env.MONGOURL)
    .then(() => { console.log("connect") })

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/user", userRouter)
app.use('/api/v1/listing', listingRouter)
app.use('/api/v1/booking', bookingRouter)

app.use((err, req, res, next) => {
    // Mongoose CastError
    console.log(err.name)
    if (err.name === "CastError") {
        err.status = 400;
        err.message = "Invalid ID format";
    }

    // Mongoose ValidationError
    if (err.name === "ValidationError") {
        err.status = 400;
    }

    // Duplicate Key
    if (err.code === 11000) {
        err.status = 400;
        err.message = "Duplicate field value";
    }

    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
        success: false,
        message
    });
})

app.listen(process.env.PORT, () => {
    console.log("Port is running")
})

