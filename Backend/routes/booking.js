const express = require("express")
const { wrapAsync } = require("../middleware/wrapAsync")
const { booking, allBooking, renderBooking, cancelBooking } = require("../controller/booking")
const bookingRouter = express.Router()

bookingRouter
    .route('/')
    .get(wrapAsync(allBooking))
    .post(wrapAsync(booking))
    
bookingRouter
    .route('/cancelBooking/:listingId')
    .get(wrapAsync(cancelBooking))

bookingRouter
    .route("/:bookingId")
    .get(wrapAsync(renderBooking))

module.exports = bookingRouter