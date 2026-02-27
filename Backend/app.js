require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const ExpressError = require("./middleware/ExpressError")
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

app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"))
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err
    res.status(status).json(message)
})

app.listen(process.env.PORT, () => {
    console.log("Port is running")
})

