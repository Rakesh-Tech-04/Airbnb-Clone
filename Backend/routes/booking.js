import express from "express"
import { wrapAsync } from "../middleware/wrapAsync.js"
import { createBooking, getUserBookings, getBookingById } from "../controller/booking.js"
import { verifyToken } from "../middleware/authentication.js"
import { bookingValidation } from "../middleware/joiValidation.js"
const router = express.Router()

router
    .route('/')
    .post(verifyToken, bookingValidation, wrapAsync(createBooking))

router
    .route('/my')
    .get(verifyToken, wrapAsync(getUserBookings))

router
    .route("/:bookingId")
    .get(wrapAsync(getBookingById))


export default router