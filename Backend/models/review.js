import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

reviewSchema.index({ listing: 1, createdAt: -1 })

const Review = mongoose.model("Review", reviewSchema)

export default Review