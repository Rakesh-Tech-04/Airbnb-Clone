import express from 'express'
import { wrapAsync } from "../middleware/wrapAsync.js"
import { signup, login, logout, authStatus } from "../controller/user.js"

const userRouter = express.Router()

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

export default userRouter