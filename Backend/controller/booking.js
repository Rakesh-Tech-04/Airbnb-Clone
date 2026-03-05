const { default: mongoose } = require("mongoose")
const Booking = require("../models/booking")
const Listing = require("../models/listing")
const ExpressError = require("../utils/ExpressError")

module.exports.createBooking = async (req, res, next) => {
    const { listing, fromDate, toDate } = req.body
    let nights = (new Date(toDate) - new Date(fromDate)) / (24 * 60 * 60 * 1000)
    let findListing = await Listing.findById(listing)
    let totalPrice = (findListing.rent * nights) + (209 * 2)
    let host = findListing.user

    if (fromDate >= toDate) {
        return next(new ExpressError(400, "Invalid date range"))
    }
    const existingBooking = await Booking.findOne({
        listing,
        status: "Booked",
        fromDate: { $lte: toDate },
        toDate: { $gte: fromDate },
    });
    if (existingBooking) {
        return next(new ExpressError(400, "Selected dates are already booked"))
    }

    let newBooking = new Booking({
        listing, fromDate, toDate, user: req.user.id, totalPrice, host, status: 'Booked'
    })
    await newBooking.save()
    res.status(200).json(newBooking)
}

// module.exports.renderBooking = async (req, res) => {
//     let { bookingId } = req.params
//     let booking = await Booking.findById(bookingId).populate({ path: 'host', select: 'email' })
//     res.status(200).json(booking)
// }

module.exports.existingBookingDate = async (req, res) => {
    let { listingId } = req.params
    let today = new Date()
    today.setHours(0, 0, 0, 0);
    let bookings = await Booking.find({ listing: listingId, fromDate: { $gte: today } }).select("fromDate toDate")
    res.status(200).json(bookings)
}

module.exports.renderMyBooking = async (req, res) => {
    let lastId = req.query.lastId

    let query = { user: req.user.id }
    if (lastId) {
        query._id = { $lt: new mongoose.Types.ObjectId(lastId) }
    }

    let allBooking = await Booking.find(query).sort({ _id: -1 }).limit(11).select('fromDate toDate listing totalPrice status').populate("listing", "title image")

    let hasMore = allBooking.length > 10
    if (hasMore) {
        allBooking.pop()
    }

    res.status(200).json({ hasMore, allBooking })
}