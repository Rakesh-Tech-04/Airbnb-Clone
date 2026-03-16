import express from 'express'
import { wrapAsync } from "../middleware/wrapAsync.js"
import { signup, login, logout, authStatus } from "../controller/auth.js"

const router = express.Router()

router.get('/authStatus', wrapAsync(authStatus))

router.post("/signup", wrapAsync(signup))

router.post('/login', wrapAsync(login))

router.delete('/logout', wrapAsync(logout))


export default router