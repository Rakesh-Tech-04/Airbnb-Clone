const mongoose = require("mongoose")

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: [{
        url: String,
        filename: String,
    }],
    rent: {
        type: Number,
        required: true,
        min: [1000, "Price must be at least 1000"]
    },
    city: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true
    },
    describe: [{
        type: String,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookingStatus: {
        type: Boolean,
        default: false
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
    }
}, {
    timestamps: true
})

listingSchema.index({ user: 1, createdAt: -1 })
listingSchema.index({ describe: 1, createdAt: -1 })

const Listing = mongoose.model("Listing", listingSchema)

module.exports = Listing