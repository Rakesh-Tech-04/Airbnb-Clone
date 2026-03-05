const express = require("express")
const { wrapAsync } = require("../middleware/wrapAsync")
const { renderBooking, existingBookingDate, createBooking, renderMyBooking } = require("../controller/booking")
const { verifyToken } = require("../middleware/authentication")
const { bookingValidation } = require("../middleware/joiValidation")
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


module.exports = bookingRouter