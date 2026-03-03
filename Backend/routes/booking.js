const express = require("express")
const { wrapAsync } = require("../middleware/wrapAsync")
const { renderBooking, cancelBooking, existingBookingDate, createBooking } = require("../controller/booking")
const { verifyToken } = require("../middleware/authentication")
const { bookingValidation } = require("../middleware/joiValidation")
const bookingRouter = express.Router({ mergeParams: true })

bookingRouter
    .route('/:listingId/booking')
    .get(wrapAsync(existingBookingDate))
    .post(verifyToken, bookingValidation, wrapAsync(createBooking))

bookingRouter
    .route("/booking/:bookingId")
    .get(wrapAsync(renderBooking))


module.exports = bookingRouter