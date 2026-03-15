import express from "express"
import { wrapAsync } from "../middleware/wrapAsync.js"
import { renderBooking, existingBookingDate, createBooking, renderMyBooking } from "../controller/booking.js"
import { verifyToken } from "../middleware/authentication.js"
import { bookingValidation } from "../middleware/joiValidation.js"
const bookingRouter = express.Router({ mergeParams: true })

bookingRouter
    .route('/myBooking')
    .get(verifyToken, wrapAsync(renderMyBooking))

bookingRouter
    .route("/:bookingId")
    .get(wrapAsync(renderBooking))

bookingRouter
    .route('/:listingId')
    .get(wrapAsync(existingBookingDate))
    .post(verifyToken, bookingValidation, wrapAsync(createBooking))


export default bookingRouter