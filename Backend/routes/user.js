const express = require("express")
const userRouter = express.Router()
const { wrapAsync } = require("../middleware/wrapAsync")
const { signup, login, logout, authStatus } = require("../controller/user")

userRouter
    .route("/signup")
    .post(wrapAsync(signup))

userRouter
    .route('/login')
    .post(wrapAsync(login))

userRouter
    .route('/logout')
    .delete(wrapAsync(logout))

userRouter
    .route('/authStatus')
    .get(wrapAsync(authStatus))

module.exports = userRouter