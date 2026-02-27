const Booking = require("../models/booking")
const Listing = require("../models/listing")
module.exports.booking = async (req, res) => {
    let newBooking = new Booking(req.body)
    await Listing.findByIdAndUpdate(newBooking.listing, { $set: { bookingStatus: true, booking: newBooking._id } })
    await newBooking.save()
    res.status(200).json(newBooking)
}

module.exports.allBooking = async (req, res) => {
    let booking = await Booking.find({})
    res.json(booking)
}

module.exports.renderBooking = async (req, res) => {
    let { bookingId } = req.params
    let booking = await Booking.findById(bookingId).populate({ path: 'host', select: 'email' })
    res.json(booking)
}

module.exports.cancelBooking = async (req, res) => {
    let { listingId } = req.params
    console.log(listingId)
    let listing = await Listing.findByIdAndUpdate(listingId, { $set: { bookingStatus: false, booking: null }})
    console.log(listing)
    await Booking.findByIdAndUpdate(listing.booking, { status: "Cancelled" })
    res.json(listing)
}