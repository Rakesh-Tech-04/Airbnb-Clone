const Review = require("../models/review")

module.exports.createReview = async (req, res) => {
    let { listingId } = req.params
    let newReview = new Review(req.body)
    newReview.listing = listingId
    newReview.user = req.user.id
    await newReview.save()
    await newReview.populate("user", "name"); 
    res.status(201).json({ success: true, message: "Thanks For Rating",newReview })
}

module.exports.renderReview = async (req, res) => {
    let { listingId } = req.params
    let review = await Review.find({ listing: listingId }).populate("user", "name").sort({ createdAt: -1 })
    res.status(200).json(review)
}

module.exports.deleteReview = async (req, res) => {
    let { reviewId } = req.params
    let deletedReview = await Review.findByIdAndDelete(reviewId)
    res.status(200).json(deletedReview)
}